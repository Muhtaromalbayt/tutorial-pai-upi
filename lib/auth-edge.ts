export async function hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const keyMaterial = await crypto.subtle.importKey(
        "raw",
        encoder.encode(password),
        { name: "PBKDF2" },
        false,
        ["deriveBits", "deriveKey"]
    );

    const key = await crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: salt,
            iterations: 100000,
            hash: "SHA-256",
        },
        keyMaterial,
        { name: "HMAC", hash: "SHA-256", length: 256 },
        true,
        ["sign", "verify"]
    );

    const exportedKey = await crypto.subtle.exportKey("raw", key);
    const hashBuffer = new Uint8Array(exportedKey);
    const hashArray = Array.from(hashBuffer);
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    const saltArray = Array.from(salt);
    const saltHex = saltArray.map(b => b.toString(16).padStart(2, '0')).join('');

    return `pbkdf2:sha256:100000:${saltHex}:${hashHex}`;
}

export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
    const parts = storedHash.split(':');
    if (parts.length !== 5) return false;

    const [algo, hashAlgo, iterations, saltHex, hashHex] = parts;
    if (algo !== 'pbkdf2' || hashAlgo !== 'sha256') return false;

    const salt = new Uint8Array(saltHex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
    const iterationsCount = parseInt(iterations);

    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
        "raw",
        encoder.encode(password),
        { name: "PBKDF2" },
        false,
        ["deriveBits", "deriveKey"]
    );

    const key = await crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: salt,
            iterations: iterationsCount,
            hash: "SHA-256",
        },
        keyMaterial,
        { name: "HMAC", hash: "SHA-256", length: 256 },
        true,
        ["sign", "verify"]
    );

    const exportedKey = await crypto.subtle.exportKey("raw", key);
    const hashBuffer = new Uint8Array(exportedKey);
    const hashArray = Array.from(hashBuffer);
    const calculatedHashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    return calculatedHashHex === hashHex;
}
