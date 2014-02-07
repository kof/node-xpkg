## Generate json files for any package manager

Are you tired from writing separate .json files for every package manager?

Now you can write just one x-package.json file and generate from it files for any package manager. Manager specific declarations are supported using "overlay" from [Packages 1.1](http://wiki.commonjs.org/wiki/Packages/1.1)

### x-package.json

1. Put all declarations you want to have in every package file as you would do it in package.json.
1. Specify "packages" array which contains file names you want to generate.

        {
            "name": "my-package",
            "version": "0.1.0",
            "overlay": {
                "npm": true,
                "bower": true,
                "jquery": true,
                "component": true
            }
        }

1. Optionally you can define package specific declarations.

        {
            "name": "my-package",
            "version": "0.1.0",
            "overlay": {
                "npm": {
                    "bin": "./bin/my-bin-script.js"
                },
                "bower": true
            }
        }

    After you run `xpkg` with this example you will get bower.json and package.json generated, where package.json will additionally contain "bin" declaration and non of them will contain x-package specific declarations.

### x-package.json5

You can use [json5](https://github.com/aseemk/json5) format. F.e. you can leave trailing comma, add single line or multi line comments or leave keys without quotes, like in javascript.

Also you can use .json extention but with json5 format inside.

### Cli

After you have installed xpkg using `npm i xpkg -g` you can run `xpkg [dir]`.

