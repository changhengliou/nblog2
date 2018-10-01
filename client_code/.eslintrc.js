module.exports = {
    extends: ["airbnb"],
    env: {
        "browser": true
    },
    globals: {
        window: true,
        document: true
    },
    rules: {
        "global-require": "off",
        "react/jsx-filename-extension": "off",
        "react/react-in-jsx-scope": "off"
    }
};