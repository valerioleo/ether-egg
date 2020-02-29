const path = require('path');
const {parseLinterGlobals} = require('./src/utils/helpers/env');

const envPath = path.join(__dirname, './.env');
const globals = parseLinterGlobals(envPath);

module.exports = {
    "globals": globals,
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "root": true,
    "extends": ["eslint:recommended", "airbnb-base", "plugin:react/recommended"],
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "settings": {
        "import/resolver": {
            "node": {
                "extensions": [
                    ".js",
                    ".jsx"
                ]
            }
        }
    },
    "rules": {
        "import/no-extraneous-dependencies": ["error", {
            "packageDir": ""
            }
        ],
        "indent": ["error", 2, {
                "SwitchCase": 1
            }
        ],
        "keyword-spacing": ["error", { 
            "overrides": {
                "if": { "after": false },
                "for": { "after": false },
                "while": { "after": false },
                "catch": { "after": false },
                "switch": { "after": false }
            }
        }],
        "array-bracket-spacing": ["error", "never"],
        "brace-style": ["error", "stroustrup"],
        "object-curly-spacing": ["error", "never"],
        "no-unused-vars": ["error", {
            "argsIgnorePattern": "_",
            "varsIgnorePattern": "^_*_$"
        }],
        "linebreak-style": ["error", "unix"],
        "quotes": ["error", "single"],
        "comma-dangle": ["error", "never"],
        "arrow-parens": ["error", "as-needed"],
        "react/prop-types": [0],
        "global-require": [0],
        "class-methods-use-this": [0],
        "no-plusplus": [0],
        "no-confusing-arrow": [0],
        "func-names": [0],
        "react/display-name": [0],
        "no-return-await": [0],
        "no-multiple-empty-lines": ["error", {"max": 1}],
        "no-param-reassign": ["error", { 
                "props": true,
                "ignorePropertyModificationsFor": ["ctx", "t"] 
            }
        ]
    },
    "overrides": [
    {
      "files": ["*-test.js","*.integration.js", "*Actions.js"],
      "rules": {
        "no-shadow": "off"
      }
    }
  ]
}
