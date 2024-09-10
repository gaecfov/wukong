const viewsFiles = import.meta.glob('./views/*.json', { eager: true });

function mergeJson(modules) {
    let obj = {};
    for (const path in modules) {
        obj = { ...obj, ...modules[path].default };
    }
    return obj;
}

const views = mergeJson(viewsFiles);
export default { ...views };
