// ArxanKiller ARM64 v29.270
// https://github.com/kubune/ArxanKillers
// Game: laser

const libg = Process.findModuleByName("libg.so");
if (!libg) throw "libg.so not found";

const ARXAN_OFFSETS = [
    0xFF4A8, 0x1AB640, 0x4818EC, 0x4EB848,
    0x6568E8, 0x2FF2FC, 0x504560, 0x39C1A0, 0x55E1F8, 0x34796C,
    0x6569E8, 0x2FF428, 0x5046B8, 0x39C21C, 0x55EC58, 0x3484AC
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