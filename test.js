
const child_process = require("child_process");
const { gt, lt, gte, lte } = require('./src');

const spawnBin = async (comparator, value, comparable) => {
    return new Promise((resolve, reject) => {
        child_process.execFile('./bin/comparator.js', [comparator, value, comparable], (err, stdout, stderr) => {
            if (err) return reject(stderr);

            resolve(stdout);
        });
    });
};

describe('cmpr', ()=> {
    describe('source', () => {
        it('gt positive', () => {
            expect(gt(1, 0)).toBe(true);
        });

        it('gt negative', () => {
            expect(gt(0, 1)).toBe(false);
            expect(gt(1, 1)).toBe(false);
        });

        it('lt positive', () => {
            expect(lt(0, 1)).toBe(true);
        });

        it('lt negative', () => {
            expect(lt(1, 1)).toBe(false);
            expect(lt(1, 0)).toBe(false);
        });

        it('gte positive', () => {
            expect(gte(1, 0)).toBe(true);
            expect(gte(1, 1)).toBe(true);
        });

        it('gt negative', () => {
            expect(gte(0, 1)).toBe(false);
        });

        it('lte positive', () => {
            expect(lte(0, 1)).toBe(true);
            expect(lte(1, 1)).toBe(true);
        });

        it('lt negative', () => {
            expect(lte(1, 0)).toBe(false);
        });
    });

    describe('cli', () => {
        it('gt positive', async () => {
            const stdout = await spawnBin('gt', 1, 0);

            expect(stdout).toBe("");
        });

        it('gt negative', async () => {
            try {
                await spawnBin('gt', 0, 1);
            } catch (stderr) {
                expect(stderr).toBe('Error: 0 is not great than 1');
            }
        });

        it('lt positive', async () => {
            const stdout = await spawnBin('lt', 0, 1);

            expect(stdout).toBe("");
        });

        it('lt negative', async () => {
            try {
                await spawnBin('lt', 0, 1);
            } catch (stderr) {
                expect(stderr).toBe('Error: 1 is not less than 0');
            }
        });

        it('gte positive', async () => {
            const stdout1 = await spawnBin('gte', 1, 0);
            const stdout2 = await spawnBin('gte', 1, 1);

            expect(stdout1).toBe("");
            expect(stdout2).toBe("");
        });

        it('gte negative', async () => {
            try {
                await spawnBin('gte', 0, 1);
            } catch (stderr) {
                expect(stderr).toBe('Error: 0 is not great than or equal 1');
            }
        });

        it('lte positive', async () => {
            const stdout1 = await spawnBin('lte', 0, 1);
            const stdout2 = await spawnBin('lte', 1, 1);

            expect(stdout1).toBe("");
            expect(stdout2).toBe("");
        });

        it('lte negative', async () => {
            try {
                await spawnBin('lte', 1, 0);
            } catch (stderr) {
                expect(stderr).toBe('Error: 1 is not less than or equal 0');
            }
        });
    });
});
