function initCanvas() {
    let can = document.createElement("canvas");
    can.setAttribute('id', 'puzzle')
    document.body.prepend(can)
}

initCanvas() // создание и показ канваса

let swipeSound;
swipeSound = new Audio('./25d7ee378d6addc.mp3');
let soundOn = true;

//иконка звука
let iconSound = document.createElement("img")
iconSound.className = 'iconSound'
document.body.prepend(iconSound)

iconSound.addEventListener('click', () => {
    if (soundOn) {
        soundOn = false;
        iconSound.style.background = 'url(soundOff.png) no-repeat';
        iconSound.style.backgroundSize = 'contain'
    } else {
        soundOn = true;
        iconSound.style.background = 'url(soundOn.png) no-repeat';
        iconSound.style.backgroundSize = 'contain'
    }
})

let timer = document.createElement('div') // создание блока для таймера
timer.className = 'timer'; // добавление класса

let clic = document.createElement('div') // создание блока для счетчика
clic.className = 'click-counter'

let btn = document.createElement('div') // создание кнопки
btn.className = 'btn';
let btnText = document.createTextNode(` New Game `)
btn.prepend(btnText)
document.body.append(btn)

let banner = document.createElement('div')
let bannerText;

let fon = document.createElement('div')


let flexDiv = document.createElement('div');
flexDiv.className = 'count-timer';





let click = 0;
let arrNum = [[1,2,3,4], [5,6,7,8], [9,10,11,12], [13,14,15,0]]
function game() { // чудо класс с методами
   let panelView = null;
   let panelNumber = null;


    //поиск пустой клетки
    function getNull() {
        for (let i = 0; i < arrNum.length; i++) { // перебираем большой массив
            for (let j = 0; j < arrNum[0].length; j++) { // перебираем маленькие массивы
                if (arrNum[j][i] === 0) { // ждем когда условие будет верно, в клетке содержится 0 и она значит пустая
                    return {'x':i, 'y':j} // возвращаем объект с координатой пустой клетки
                }
            }
        }
    };

    // генерируем случайное логическое значение (true или false)
    function getRandomBoolValue() { // должно быть понятно
        if (Math.round(Math.random() *2) === 0) {
            return true
        } else {return false}
    };

    // функцию числа ходов
    this.getClick = function () { //  получение числа ходов
        return click
    }
    //

    //метод перемещения клетки в пустую клетку
    this.move = function (x, y) {
        let nullX = getNull().x; // получаем значение координаты x из объекта, где сейчас находится пустая клетка (0)
        let nullY = getNull().y; // получаем значение координаты y из объекта, где сейчас находится пустая клетка (0)
        // если по х+1 и х-1 есть совпадения, то вернет тру, если нет, то будет проверка по у, если у+1 и у-1 имеет совпадения с нулем, то вернет тру
        if (((x + 1 === nullX || x - 1 === nullX) && y === nullY) || ((y - 1 === nullY || y + 1 === nullY) && x === nullX)) {
            arrNum[nullY][nullX] = arrNum[y][x]; //записываем вместо 0 наше число (перемещаем число на пустую клетку)
            arrNum[y][x] = 0; // вместо числа, записываем 0 (перемещаем пустую клетку, на место числа)
            click++; // общее число кликов
            if (soundOn) {
                swipeSound.play()
            }
        }
    };
    // swipeSound
    // проверка победы каждый ход
    this.win = function () {
        let etalon = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 0]] // как выглядит эталонная и победная часть
        let result = true // сходу результат пускай будет тру
        for (let i = 0; i < etalon.length; i++) { // перебор эталона и измененного массива
            for (let j = 0; j < etalon[0].length; j++){ // перебор эталона и измененного массива
                if (etalon[i][j] !== arrNum[i][j]) { // сравнение эталона и измененного массива, если все совпало, то = вин!, если не совпало, то играем дальше
                    result = false
                }
            }
        }
        return result // возвращение результата
    };

    // метод перемешивания всех клеток
    this.mix = function (mixCount) {
        let x,y;
        for (let i = 0; i < mixCount; i++) {
            let nullX = getNull().x;
            let nullY = getNull().y;

            let leftMove = getRandomBoolValue();
            let upMove = getRandomBoolValue();

            if (!leftMove && !upMove) { y = nullY; x = nullX - 1 }
            if (leftMove && !upMove) { x = nullX; y = nullY + 1 }

            if (!leftMove && upMove) { y = nullY; x = nullX + 1 }
            if (leftMove && upMove) { x = nullX; y = nullY - 1 }

            if (0 <= x && x <= 3 && 0 <= y && y <= 3) {
                this.move(x, y)
            }
        }
        click = 0;
    };

    // внешний вид клетки
    this.setPanelView = function (func) {
        // setInterval(() => {}, 200)

        panelView = func
    }

    // внешний вид цифр
    this.setPanelNumber = function (func) {
        // setInterval(() => {}, 200)
        panelNumber = func
    }

    this.draw = function (context, size) {
        for (let i = 0; i < 4; i++) { // проход по массиву
            for (let j = 0; j < 4; j++) { // проход по массиву

                if (arrNum[i][j] > 0) { // проверка или элемент не пустое место

                    if (panelView !== null) { // проверка или содержит в себе функцию с параметрами отрисовки
                        panelView(j * size, i * size) // передает в функцию координаты x и y для размеров сторон
                    }
                    if (panelNumber !== null) {
                        panelNumber();
                        context.fillText(arrNum[i][j], j * size + size /2, i * size + size /2)
                    }
                }
            }
        }
    }


}



function initial() {
    const canvas = document.getElementById('puzzle'), // создаем канвас и контекст
        context = canvas.getContext('2d');
    if (window.innerWidth >= 541) {
        canvas.width = 500; // ширина игровой области
        canvas.height = 500; // высота игровой области
    }

    if (window.innerWidth <= 540) {
        canvas.width = 350; // ширина игровой области
        canvas.height = 350; // высота игровой области
    }

    if (window.innerWidth <= 390) {
        canvas.width = 260; // ширина игровой области
        canvas.height = 260; // высота игровой области
    }


    let panelSize = canvas.width / 4;

    let objGame = new game();
    objGame.mix(500); // перемешиваем 500 раз
    // задаем внешний вид ячеек
    objGame.setPanelView(function (x, y) { // заливка блоков градиентом
        let gradient = context.createLinearGradient(0, 0, 900, 0)
        gradient.addColorStop('0', '#FFB800')
        gradient.addColorStop('.5', '#644800')
        gradient.addColorStop('1', '#FFDB7D')

        context.fillStyle = gradient; // цвет заливки квадратов

        // скругление краев квадратов, но еще не разобрал
        function roundedRect(context, x, y, width, height, radius) {
            context.beginPath();
            context.moveTo(x, y + radius);
            context.arcTo(x, y + height, x + radius, y + height, radius);
            context.arcTo(x + width, y + height, x + width, y + height - radius, radius);
            context.arcTo(x + width, y, x + width - radius, y, radius);
            context.arcTo(x, y, x, y + radius, radius);
            context.stroke();
            context.fill();
        }
        roundedRect(context,x + 3, y + 3 , panelSize - 8, panelSize - 8, 10)
    });
    objGame.setPanelNumber(function () {
        context.font = `bold ${canvas.width / 8}px Arial, sans-serif`
        context.textAlign = 'center'
        context.textBaseline = 'middle'
        context.fillStyle = '#00285C'
    });

    context.fillStyle = '#A4FB00' // цвет фона
    context.fillRect(0, 0, canvas.width, canvas.height) // заливаем фон
    objGame.draw(context, panelSize)



    function event(x, y) {
        objGame.move(x, y);
        context.fillStyle = '#A4FB00'
        context.fillRect(0, 0, canvas.width, canvas.height) // заливаем фон
        objGame.draw(context, panelSize)

        if (objGame.win()) {

            banner.className = 'winBanner'
            // clearInterval(tim);
            // clearInterval(timerSecond);
            bannerText = document.createTextNode(`Ура! Вы решили головоломку за ${timerMinute}: ${timerSecond} и ${click} ходов!`)
            banner.prepend(bannerText)
            document.body.append(banner)


            fon.classList.add('active')
            document.body.prepend(fon) // затемнение

            objGame.mix(300)
            context.fillStyle = '#A4FB00' // цвет фона
            context.fillRect(0, 0, canvas.width, canvas.height) // заливаем фон
            objGame.draw(context, panelSize)
        }
        document.querySelector('.click-counter').innerHTML = `${click}`

        // counterText.innerText = ` ${click} `
    }


    btn.addEventListener('click', () => {
        objGame.mix(300)
        click = 0
        document.querySelector('.click-counter').innerHTML = `${click}`
        timerMinute = 0 // минут
        timerSecond = 0 // секунды
        context.fillStyle = '#A4FB00' // цвет фона
        context.fillRect(0, 0, canvas.width, canvas.height) // заливаем фон
        // banner.classList.remove('active')
        banner.remove()
        bannerText === undefined ? console.log() : bannerText.remove();
        fon.classList.remove('active')
        objGame.draw(context, panelSize)
    })


    canvas.onclick = function (e) {
        let x = (e.pageX - canvas.offsetLeft) / panelSize | 0;
        let y = (e.pageY - canvas.offsetTop) / panelSize | 0;
        localStorage.setItem('arrNum', JSON.stringify(arrNum)) // сейв инфы

        event(x, y)
    }

    canvas.ontouchend = function(e) { // обрабатываем касания пальцем
        let x = (e.touches[0].pageX - canvas.offsetLeft) / panelSize | 0;
        let y = (e.touches[0].pageY - canvas.offsetTop)  / panelSize | 0;
        event(x, y);
    };

}


let timerMinute = 0 // минут
let timerSecond = 0 // секунды
let tim = setInterval(() => { // таймер для таймера
    timerSecond++; // счетчик секунд
    if (timerSecond > 60) {
        timerMinute++; // счетчик минут
        timerSecond = 0;
    }
    document.querySelector('.timer').innerHTML = ` ${timerMinute.toString().length === 1 ? '0' + timerMinute : timerMinute } : ${timerSecond.toString().length === 1 ? '0' + timerSecond : timerSecond} `
}, 1000)

let timerText = document.createTextNode(` ${timerMinute} : ${timerSecond} `) // текстовый блок с таймером
timer.prepend(timerText) // добавление таймера в блок
document.body.prepend(timer) // добавление на страницу


let counterText = document.createTextNode(` 0 `)
clic.prepend(counterText)
document.body.append(clic)



initial();



