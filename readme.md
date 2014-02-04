## Generate json files for any package manager

A you tired from writing separate different .json files for every package manager?

Now you can write just one x-package.json file and generate from it files for any package manager.

### x-package.json

1. Put all declarations you want to have in every package file as you would do it in package.json.
1. Specify "packages" array which contains file names you want to generate.

            {
                "name": "my-package",
                "version": "0.1.0",
                "packages": ["bower.json", "package.json"]
            }

1. Optionally you can define package specific declarations.

        {
            "name": "my-package",
            "version": "0.1.0",
            "packages": ["bower.json", "package.json"],
            "package.json": {"bin": "./bin/my-bin-script.js"}
        }

    After you run `xpkg` with this example you will get bower.json and package.json generated, where package.json will additionally contain "bin" declaration and non of them will contain x-package specific declarations.


### Cli

After you have installed xpkg using `npm i xpkg -g` you can run `xpkg [dir]`.

