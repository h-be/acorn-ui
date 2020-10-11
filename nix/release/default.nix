 { pkgs, config }:
let
 acorn-build = pkgs.writeShellScriptBin "acorn-build"
 ''
 set -euxo pipefail
 ${pkgs.nodejs}/bin/npm run build
 cd dist && zip acorn-ui -r . && cd ..
 '';

 tag = "v${config.release.version.current}";

 release-github-zip = pkgs.writeShellScriptBin "release-github-zip"
 ''
 set -euxo pipefail
 export zip_artifact='./dist/acorn-ui.zip'
 export zip_artifact_name='acorn-ui.zip'
 export tag=''${CIRCLE_TAG:-${tag}}
 acorn-build
 github-release upload --file "$zip_artifact" --owner ${config.release.github.owner} --repo ${config.release.github.repo} --tag $tag --name $zip_artifact_name --token $GITHUB_DEPLOY_TOKEN
 '';
in
{
 buildInputs = [ acorn-build release-github-zip ];
}
