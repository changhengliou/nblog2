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
        "consistent-return": "warn",
        "global-require": "off",
        "no-plusplus": "off",
        "no-bitwise": "off",
        "react/jsx-filename-extension": "off",
        "react/react-in-jsx-scope": "off",
        "react/destructuring-assignment": "off",
        "react/forbid-prop-types": "warn",
        "react/require-default-props": "warn",
        "react/prop-types": "warn",
        "import/no-unresolved": "warn",
        "import/no-extraneous-dependencies": "warn",
        "jsx-a11y/interactive-supports-focus": "warn",
        "jsx-a11y/click-events-have-key-events": "warn",
        "jsx-a11y/no-static-element-interactions": "warn",
    }
};