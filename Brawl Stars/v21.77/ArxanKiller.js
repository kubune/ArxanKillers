// ArxanKiller ARM64 v21.77
// https://github.com/kubune/ArxanKillers
// Game: laser

const libg = Process.findModuleByName("libg.so");
if (!libg) throw "libg.so not found";

const ARXAN_OFFSETS = [
    0x4B1930, 0x1EDDC4, 0x205648,
    0xE76D0, 0xC8E3C, 0x1B8928, 0x533278, 0x1DF514,
    0xEC6CC, 0xC98CC, 0x1B8B00, 0x533E2C, 0x1DF78C
].map(x => libg.base.add(x));

Interceptor.replace(Module.getGlobalExportByName("openat"),
    new NativeCallback(() => -1, "int", ["int", "pointer"])
);

Interceptor.replace(ARXAN_OFFSETS[0], ARXAN_OFFSETS[1]);
Interceptor.replace(ARXAN_OFFSETS[2], new NativeCallback(() => 0, "int", []));

ARXAN_OFFSETS.slice(3,8).forEach((j, i) =>
    Interceptor.attach(j, function () {
        this.context.x8 = ARXAN_OFFSETS[8 + i];
    })
);