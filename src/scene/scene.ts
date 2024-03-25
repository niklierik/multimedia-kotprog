import $ from 'jquery';

export interface Scene {
    width: number;
    height: number;

    canvas: HTMLCanvasElement;
}

function cssPixelStringToNumber(text: string): number {
    const regex = /([0-9]+)\s*px/;
    const result = regex.exec(text);
    if (!result) {
        return NaN;
    }

    const number = result[1];

    return Number(number);
}

export async function setupScene(): Promise<Scene> {
    return new Promise((resolve, reject) => {
        $(() => {
            const body$ = $('body');
            const bodyWidthStr = body$.css('width');
            const bodyHeightStr = body$.css('height');

            const bodyWidth = cssPixelStringToNumber(bodyWidthStr);
            const bodyHeight = cssPixelStringToNumber(bodyHeightStr);

            const canvas$ = $('canvas#main-canvas');
            const [canvas] = canvas$.get() as [HTMLCanvasElement];

            if (!canvas) {
                reject(new Error('Missing #main-canvas on the host html.'));
                return;
            }

            canvas$.attr('width', bodyWidthStr);
            canvas$.attr('height', bodyHeightStr);

            const context = canvas.getContext('2d');
            if (!context) {
                reject(new Error('Missing canvas context.'));
                return;
            }

            context.fillStyle = '#000';
            context.fillRect(0, 0, bodyWidth, bodyHeight);

            resolve({
                canvas,
                width: bodyWidth,
                height: bodyHeight,
            });
        });
    });
}
