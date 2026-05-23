export const usernameToEmail = (username = '') => {
    const slug = username
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '.')
        .replace(/^\.+|\.+$/g, '');

    return `${slug || 'user'}@jj-group.local`;
};
