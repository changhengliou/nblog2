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
        "react/react-in-jsx-scope": "off",
        "react/destructuring-assignment": "off",
        "react/forbid-prop-types": "warn",
        "react/require-default-props": "warn",
        "react/prop-types": "warn",
        "import/no-unresolved": "warn",
        "import/no-extraneous-dependencies": "warn",
        "no-plusplus": "off",
        "no-bitwise": "off",
        "jsx-a11y/interactive-supports-focus": "warn",
        "jsx-a11y/click-events-have-key-events": "warn",
    }
};