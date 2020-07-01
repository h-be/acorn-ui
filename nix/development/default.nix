{ pkgs }:
let
 acorn-ui = pkgs.writeShellScriptBin "acorn-ui"
 ''
 set -euxo pipefail
 ${pkgs.nodejs}/bin/npm start
 '';
in
{
 buildInputs = [ acorn-ui ];
}