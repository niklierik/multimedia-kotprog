import { setupScene } from './scene/scene';

async function main(): Promise<void> {
    await setupScene();
}

main().catch(console.error);
