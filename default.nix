# This is an example of what downstream consumers of holonix should do
# This is also used to dogfood as many commands as possible for holonix
# For example the release process for holonix uses this file
let

 # point this to your local config.nix file for this project
 # example.config.nix shows and documents a lot of the options
 config = import ./config.nix;

 # START HOLONIX IMPORT BOILERPLATE
 holonix = import (
  if ! config.holonix.use-github
  then config.holonix.local.path
  else fetchTarball {
   url = "https://github.com/${config.holonix.github.owner}/${config.holonix.github.repo}/tarball/${config.holonix.github.ref}";
   sha256 = config.holonix.github.sha256;
  }
 ) { config = config; };
 # END HOLONIX IMPORT BOILERPLATE

in
with holonix.pkgs;
{
 dev-shell = stdenv.mkDerivation (holonix.shell // {
  name = "dev-shell";

  shellHook = holonix.pkgs.lib.concatStrings [''
  ${holonix.pkgs.nodejs}/bin/npm install
  export PATH="$PATH:$( ${holonix.pkgs.nodejs}/bin/npm bin )"
  ''
  holonix.shell.shellHook
  ];

  nativeBuildInputs = [
    zip
  ];

  buildInputs = [
  holonix.pkgs.nodejs
  ]
   ++ holonix.shell.buildInputs
   ++ config.buildInputs
   ++ (holonix.pkgs.callPackage ./nix {
    holonix = holonix;
    config = config;
   }).buildInputs
  ;
 });
}
