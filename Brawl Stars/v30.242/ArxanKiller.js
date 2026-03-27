// ArxanKiller ARM64 v30.242
// https://github.com/kubune/ArxanKillers
// Game: laser

const libg = Process.findModuleByName("libg.so");
if (!libg) throw "libg.so not found";

const ARXAN_OFFSETS = [
    0x4A8098, 0xE3E58, 0x5AD188, 0x210430,
    0x34F170, 0x3FEE28, 0x5B5BB8, 0x30C290, 0x2AEDD0, 0x2693AC,
    0x34F224, 0x3FEEC4, 0x5B5EDC, 0x30CDF4, 0x2AF8D0, 0x2695A4
].map(x => libg.base.add(x));

Interceptor.replace(Module.getGlobalExportByName("openat"),
    new NativeCallback(() => -1, "int", ["int", "pointer"])
);

Interceptor.replace(ARXAN_OFFSETS[0], ARXAN_OFFSETS[1]);
Interceptor.replace(ARXAN_OFFSETS[2], new NativeCallback(() => 0, "int", []));
Interceptor.replace(ARXAN_OFFSETS[3], new NativeCallback(() => {}, "void", []));

ARXAN_OFFSETS.slice(4, 10).forEach((j, i) =>
    Interceptor.attach(j, function () {
        this.context.x8 = ARXAN_OFFSETS[10 + i];
    })
);