// ArxanKiller ARM64 v18.104
// https://github.com/kubune/ArxanKillers
// Game: laser

const libg = Process.findModuleByName("libg.so");
if (!libg) throw "libg.so not found";

const ARXAN_OFFSETS = [
    0x34DCAC, 0x2AD294, 0x3DB70C,
    0x119DA4, 0x16EA18, 0x1ABA34, 0x2C2C10,
    0x11A9DC, 0x16ED80, 0x1AC524, 0x2C2EA4
].map(x => libg.base.add(x));

Interceptor.replace(Module.getGlobalExportByName("openat"),
    new NativeCallback(() => -1, "int", ["int", "pointer"])
);

Interceptor.replace(ARXAN_OFFSETS[0], ARXAN_OFFSETS[1]);
Interceptor.replace(ARXAN_OFFSETS[2], new NativeCallback(() => 0, "int", []));

ARXAN_OFFSETS.slice(3, 7).forEach((j, i) =>
    Interceptor.attach(j, function () {
        this.context.x8 = ARXAN_OFFSETS[7 + i];
    })
);