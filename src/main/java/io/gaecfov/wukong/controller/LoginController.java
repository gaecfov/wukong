package io.gaecfov.wukong.controller;

import io.gaecfov.wukong.entity.User;
import io.gaecfov.wukong.request.LoginRequest;
import io.gaecfov.wukong.response.CurrentUser;
import io.gaecfov.wukong.security.JwtUtil;
import io.gaecfov.wukong.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author zhangqin
 */
@Slf4j
@RestController
@RequiredArgsConstructor
public class LoginController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;

    @PostMapping("/login")
    public String login(@Valid @RequestBody LoginRequest request) {
        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
            request.getUsername(), request.getPassword());
        Authentication authentication = authenticationManager.authenticate(auth);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return JwtUtil.generateToken(userDetails);
    }

    @GetMapping("/currentUser")
    public ResponseEntity<CurrentUser> getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getPrincipal()
            .toString();
        User user = userService.getByName(username);
        CurrentUser currentUser = new CurrentUser();
        currentUser.setUserId(user.getId());
        currentUser.setUsername(user.getUsername());
        currentUser.setRole(user.getRole());
        return ResponseEntity.ok(currentUser);
    }
}
