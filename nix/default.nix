{ holonix, config }:
{
 buildInputs = []
 ++ ( holonix.pkgs.callPackage ./development { pkgs = holonix.pkgs; }).buildInputs
 ++ ( holonix.pkgs.callPackage ./release { pkgs = holonix.pkgs; config = config; }).buildInputs
 ;
}
