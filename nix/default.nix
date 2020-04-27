{ holonix }:
{
 buildInputs = [
 (holonix.pkgs.writeShellScriptBin "acorn-ui"
 ''
 set -euxo pipefail
 ${holonix.pkgs.nodejs}/bin/npm start
 '')
 (holonix.pkgs.writeShellScriptBin "acorn-build"
 ''
 set -euxo pipefail
 curl -O -L https://github.com/h-be/acorn-hc/releases/download/v''${1:-0.3.2}/projects.dna.json
 export PROJECTS_DNA_ADDRESS="'$(hc hash --path projects.dna.json | awk '/DNA Hash: /{print $NF}' | tr -d '\n')'"
 ${holonix.pkgs.nodejs}/bin/npm run build
 cd dist && zip acorn-ui -r . && cd ..
 '')
 ];
}
