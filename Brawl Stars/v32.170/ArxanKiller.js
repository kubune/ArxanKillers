// ArxanKiller ARM64 v32.170
// https://github.com/kubune/ArxanKillers
// Game: laser

const libg = Process.findModuleByName("libg.so");
if (!libg) throw "libg.so not found";

const ARXAN_OFFSETS = [
    0x3F39C0, 0x608C7C, 0x142708, 0xF6E88,
    0x112EDC, 0x18A264, 0x3324A0, 0x6D10AC, 0x6391F4, 0x39CECC,
    0x113D0C, 0x18A828, 0x332510, 0x6D1C9C, 0x6392D0, 0x39DA18
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