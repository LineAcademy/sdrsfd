export function hasPermission(title, permission_title) {
    const admin_menus = JSON.parse(localStorage.getItem("userInfo")).admin_menu;
    let group_rights = [];
    admin_menus.forEach(group_right => {
        if (group_right.sub_menus.length > 0) {
            group_right.sub_menus.forEach(obj => {
                group_rights.push(obj)
            });
        } else {
            group_rights.push(group_right)
        }
    });
    let permissions_found = false;
    const permissions = group_rights.find(right => right.title == title)
    if(permissions) {
        permissions_found = permissions.permissions.find(obj => obj.title == permission_title) ? true : false
    }
    return permissions_found;
}