import { create } from './createElement';

class Carousel {
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
        let children = this.data.map(url => {
            let element = <img src={url} />;
            element.addEventListener('dragstart', event => event.preventDefault());
            return element;
        });

        let root = <div class="carousel">
            { children }
        </div>;

        let position = 0;
        let nextPic = () => {
            let nextPosition = (position + 1) % this.data.length;
            let current = children[position];
            let next = children[nextPosition];

            current.style.transition = 'ease 0s';
            next.style.transition = 'ease 0s';
            current.style.transform = `translateX(${- 100 * position}%)`; // 当前位置(0, 0)
            next.style.transform = `translateX(${100 - 100 * nextPosition}%)`;// 下一位置(0, 1)

            setTimeout(() => {
                current.style.transition = ''; // '' means use css rules
                next.style.transition = '';
                current.style.transform = `translateX(${- 100 - 100 * position}%)`; // 回到 -100% 位置, 待播 (-1, 0)
                next.style.transform = `translateX(${- 100 * nextPosition}%)`; // 当前播放的图片 (0, 0)
                position = nextPosition;
            }, 16);
            
            setTimeout(nextPic, 3000);
        };
        // setTimeout(nextPic, 3000);

        root.addEventListener('mousedown', event => {
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
        });

        return root;
    }
  
    mountTo(parent) {
        this.render().mountTo(parent);
    }
}

  
let component = <Carousel data={
    [
        "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
        "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
        "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
        "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
    ]
}/>;
  
component.mountTo(document.body);
  
  
console.log(component);
  