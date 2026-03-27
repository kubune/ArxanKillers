// ArxanKiller ARM64 v31.96
// https://github.com/kubune/ArxanKillers
// Game: laser

const libg = Process.findModuleByName("libg.so");
if (!libg) throw "libg.so not found";

const ARXAN_OFFSETS = [
    0x5F79EC, 0x16B360, 0x1D41C0, 0x1F8D6C,
    0x28C9CC, 0x643B6C, 0x63CC68, 0x1E6F60, 0x6446D8, 0x37DE80,
    0x28D704, 0x6443B8, 0x63CD48, 0x1E797C, 0x645418, 0x37E218
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