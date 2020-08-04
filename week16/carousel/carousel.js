import { create } from './createElement';
import { Timeline, Animation } from './animation';
import { ease, linear } from './cubicBezier';

import css from './carousel.css';

// console.log(css)
/*
let style = document.createElement('style');
style.innerHTML = css[0][1];
document.documentElement.appendChild(style);
*/
export class Carousel {
    constructor() {
        this.children = [];
        this.attributes = new Map();
        this.properties = new Map();
    }

    setAttribute(name, value) { // attribute
        this[name] = value;
    }
  
    appendChild(child) {
        this.children.push(child);
    }

    render() {
        let timeline = new Timeline;
        timeline.start();

        let position = 0;

        let nextPicStopHandler = null;

        let children = this.data.map((url, currentPosition) => {

            let lastPosition = (currentPosition - 1 + this.data.length) % this.data.length; 
            let nextPosition = (currentPosition + 1) % this.data.length;

            let offset = 0;

            let onStart = () => {
                timeline.pause();
                clearTimeout(nextPicStopHandler);
                let currentElement = children[currentPosition];
                let currentTransformValue = Number(currentElement.style.transform.match(/translateX\(([\s\S]+)px\)/)[1]);
                offset = currentTransformValue + 500 * currentPosition;

                // console.log('offset', offset)
            };
    
            let onPan = event => {
                let lastElement = children[lastPosition];
                let currentElement = children[currentPosition];
                let nextElement = children[nextPosition];

                let currentTransformValue = -500 * currentPosition + offset + dx;
                let lastTransformValue = -500 - 500 * lastPosition + offset + dx;
                let nextTransformValue = 500 - 500 * nextPosition + offset + dx;

                let dx = event.detail.clientX - event.detail.startX;

                // console.log(event, currentTransformValue, dx)

                lastElement.style.transform = `translateX(${lastTransformValue}px)`;
                currentElement.style.transform = `translateX(${currentTransformValue}px)`;
                nextElement.style.transform = `translateX(${nextTransformValue}px)`;


                // console.log(currentTransformValue)
            };

            let onPanend = event => {
                const { clientX, startX } = event.detail;
                let dx = clientX - startX;

                // console.log('flick', event.detail.isFlick);
                
                let direction = 0;
                if (dx + offset > 300 || dx > 0 && event.detail.isFlick) {
                    direction = 1;
                } else if (dx + offset < -300 || dx < 0 && event.detail.isFlick) {
                    direction = -1;
                }

                // console.log(dx, dx + offset);


                timeline.reset();
                timeline.start();

                let lastTransformValue = -500 - 500 * lastPosition + offset + dx;
                let currentTransformValue = -500 * currentPosition + offset + dx;
                let nextTransformValue = 500 - 500 * nextPosition + offset + dx;

                let lastElement = children[lastPosition];
                let currentElement = children[currentPosition];
                let nextElement = children[nextPosition];

                let lastAnimation = new Animation(lastElement.style, 'transform', lastTransformValue, -500 - 500 * lastPosition + direction * 500, 500, 0, ease, v => `translateX(${v}px)`);
                let currentAnimation = new Animation(currentElement.style, 'transform', currentTransformValue, -500 * currentPosition + direction * 500, 500, 0, ease, v => `translateX(${v}px)`);
                let nextAnimation = new Animation(nextElement.style, 'transform', nextTransformValue, 500 - 500 * nextPosition + direction * 500, 500, 0, ease, v => `translateX(${v}px)`);
                
                timeline.add(lastAnimation);
                timeline.add(currentAnimation);
                timeline.add(nextAnimation);

                position = (position - direction + this.data.length) % this.data.length;

                nextPicStopHandler = setTimeout(nextPic, 3000);

            }

            let element = <img src={url}
                            onStart={onStart}
                            onPan={onPan}
                            onPanend={onPanend}
                            enableGesture={true}
                          />;
            element.style.transform = 'translateX(0px)';
            element.addEventListener('dragstart', event => event.preventDefault());
            return element;
        });

        let root = <div class="carousel">
            { children }
        </div>;

        let nextPic = () => {
            let nextPosition = (position + 1) % this.data.length;
            let current = children[position];
            let next = children[nextPosition];

            let currentAnimation = new Animation(current.style, 'transform', - 100 * position, - 100 - 100 * position, 500, 0, ease, v => `translateX(${5 * v}px)`);
            let nextAnimation = new Animation(next.style, 'transform', 100 - 100 * nextPosition, - 100 * nextPosition, 500, 0, ease, v => `translateX(${5 * v}px)`);

            timeline.add(currentAnimation);
            timeline.add(nextAnimation);

            position = nextPosition;
            
            nextPicStopHandler = setTimeout(nextPic, 3000);
        };

        nextPicStopHandler = setTimeout(nextPic, 3000);

        /*root.addEventListener('mousedown', event => {
            // clientX clientY 鼠标指针在点击元素（DOM）中的 X 坐标, Y 坐标。
            let startX = event.clientX;

            let imgWidth = children[position].root.getClientRects()[0].width;

            let lastPosition =  (position - 1 + this.data.length) % this.data.length;
            let nextPosition =  (position + 1) % this.data.length;

            let current = children[position];
            let last = children[lastPosition];
            let next = children[nextPosition];

            current.style.transform = `translateX(${- imgWidth * position}px)`;
            last.style.transform = `translateX(${- imgWidth - imgWidth * lastPosition}px)`;
            next.style.transform = `translateX(${imgWidth - imgWidth * nextPosition}px)`;

            let move = event => {
                // console.log(event.clientX - startX, event.clientY - startY);
                current.style.transition = 'none';
                last.style.transition = 'none';
                next.style.transition = 'none';

                current.style.transform = `translateX(${event.clientX - startX - imgWidth * position}px)`;
                last.style.transform = `translateX(${event.clientX - startX - imgWidth - imgWidth * lastPosition}px)`;
                next.style.transform = `translateX(${event.clientX - startX + imgWidth - imgWidth * nextPosition}px)`;
            };
            let up = event => {
                let offset = 0;

                if (event.clientX - startX > imgWidth / 2)
                    offset = 1;
                else if (event.clientX - startX < - imgWidth / 2)
                    offset = -1;
                
                current.style.transition = "";
                last.style.transition = "";
                next.style.transition = "";

                current.style.transition = "";
                last.style.transition = "";
                next.style.transition = "";

                current.style.transform = `translateX(${offset * imgWidth - imgWidth * position}px)`;
                last.style.transform = `translateX(${offset * imgWidth - imgWidth - imgWidth * lastPosition}px)`;
                next.style.transform = `translateX(${offset * imgWidth + imgWidth - imgWidth * nextPosition}px)`;

                position = (position - offset + this.data.length) % this.data.length

                document.removeEventListener('mousemove', move);
                document.removeEventListener('mouseup', up);
            };
            document.addEventListener('mousemove', move);
            document.addEventListener('mouseup', up);
        });*/

        return root;
    }
  
    mountTo(parent) {
        this.render().mountTo(parent);
    }
}
