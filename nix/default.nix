{ holonix }:
{
 buildInputs = [
 (holonix.pkgs.writeShellScriptBin "acorn-ui"
 ''
 set -euxo pipefail
 ${holonix.pkgs.nodejs}/bin/npm start
 '')
 ];
}
