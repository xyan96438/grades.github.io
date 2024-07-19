// let hero = document.querySelector('.hero')
// let slider = document.querySelector('.slider')
// let animate = document.querySelector('.animate')

// const time_line = new TimelineMax()

// //parameter1 是要控制的對象
// //parameter2 是duration
// //parameter3 是控制對象的原始狀態
// //parameter4 是控制對樣的動畫結束後的狀態
// time_line
//     .fromTo(hero, 1, { height: "0%" }, { height: "100%", ease: Power2.easeInOut })
//     .fromTo(hero, 1.2, { width: "80%" }, { width: "100%", ease: Power2.easeInOut })
//     .fromTo(slider, 1, { x: "-100%" }, { x: "0%", ease: Power2.easeInOut }, '-=1.2')
//     .fromTo(animate, 0.3, { opacity: 1 }, { opacity: 0 })

// setTimeout(function () {
//     animate.style.pointerEvents = "none";
// }, 2500)


//阻止默認行為
let buttons = document.querySelectorAll('button')
window.addEventListener('keypress', function (e) {
    e = e || window.event
    if (e.keyCode === 13) {
        try {
            e.preventDefault()
        } catch (err) {
            e.returnValue = false
        }
    }
})
window.addEventListener('click', function (e) {
    e = e || window.event
    try {
        e.preventDefault()
    } catch (err) {
        e.returnValue = false
    }
    try {
        e.stopPropagation()
    } catch (err) {
        e.cancelBubble = true
    }
})

//改變 select 顏色
let main = document.querySelector('main')
let form = document.querySelector('form')
let select = document.querySelectorAll('.select')
let score = document.querySelector('.score')


form.addEventListener('change', function (e) {
    e = e || window.event
    target = e.target || e.srcElement
    if (target.nodeName === 'SELECT') {

        if (target.value === '4' || target.value === '3.7') {
            target.style.backgroundColor = 'lightgreen'
            target.style.color = 'black'
        } else if (target.value === '3.4' || target.value === '3' || target.value === '2.7') {
            target.style.backgroundColor = 'yellow'
            target.style.color = 'black'
        } else if (target.value === '2.4' || target.value === '2' || target.value === '1.7') {
            target.style.backgroundColor = 'orange'
            target.style.color = 'black'
        } else if (target.value === '1.4' || target.value === '1' || target.value === '0.7') {
            target.style.backgroundColor = 'red'
            target.style.color = 'black'
        } else if (target.value === '0') {
            target.style.backgroundColor = 'grey'
            target.style.color = 'white'
        } else {
            target.style.backgroundColor = 'white'
        }
        let get_score = setGpa()
        score.innerHTML = get_score
    }

    if (target.nodeName === 'INPUT' && !isNaN(target.value - 0)) {
        let get_score = setGpa()
        score.innerHTML = get_score
    }
})



//計算成績
function setGpa() {
    //取得學分欄位元素
    let credit = document.querySelectorAll('.class_credit')
    //計算總學分數
    let x = 0
    //計算學分數 * 學期分數
    let y = 0
    //計算總平均
    let z = 0
    credit.forEach(item => {
        x += (item.value - 0)
        y += item.value * (item.nextElementSibling.value - 0)
        // z = (y / x).toFixed(2)   // 0/0 在數學上來說是NaN
        z = isNaN((y / x).toFixed(2)) ? '0.00' : (y / x).toFixed(2)
    })
    // console.log(x, y, z)
    return z
}


//給 main 委託點擊事件
let plus = document.querySelector('.plus')
let div = document.querySelectorAll('.grader')
main.addEventListener('click', e => {
    e = e || window.event
    target = e.target || e.srcElement
    if (target.nodeName === 'BUTTON') {
        //根據不同的按鈕執行不同的代碼
        switch (target.className) {
            case 'up': Sort('down')
                break
            case 'down': Sort('up')
                break
            case 'reset': formReset()
                break
            case 'trash':
                // target.parentElement.style.removeProperty('animation')
                target.parentElement.className += ' remove'
                //給垃圾桶的父元素 div 綁上 transitionend 事件
                //會監聽 transition 結束完畢之後才執行裡面的代碼
                target.parentElement.addEventListener('transitionend', e => {
                    target.parentElement.remove()
                    let get_score = setGpa()
                    score.innerHTML = get_score
                })
                break
            case 'plus': createOne()
        }
    }
})

//點擊 + 就多一條新的
function createOne() {
    //創建 div
    const newDiv = document.createElement('div')
    newDiv.className = 'grader'

    //創建input1
    const newInp1 = document.createElement('input')
    newInp1.type = 'text'
    newInp1.placeholder = '學科項目'
    newInp1.className = 'class_type'
    newInp1.setAttribute('list', 'opt')

    //創建input2
    const newInp2 = document.createElement('input')
    newInp2.type = 'text'
    newInp2.placeholder = '學年'
    newInp2.className = 'class_number'

    //創建input3
    const newInp3 = document.createElement('input')
    newInp3.type = 'number'
    newInp3.placeholder = '學分'
    newInp3.min = '0'
    newInp3.max = '6'
    newInp3.className = 'class_credit'

    //創建 新的 select 元素及其 options
    const newSelect = document.createElement('select')
    newSelect.name = 'select'
    newSelect.id = 'select'
    const optionValue = ['0.00', '4', '3.7', '3.4', '3', '2.7', '2.4', '2', '1.7', '1.4', '1', '0.7', '0']
    const optionTexts = ['', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F']

    // 根据值数组和文本数组创建 option 元素并添加到 select 中
    for (let i = 0; i < optionValue.length; i++) {
        const newOption = document.createElement('option')
        newOption.value = optionValue[i]
        newOption.textContent = optionTexts[i]
        newSelect.appendChild(newOption)
    }

    //創建 新垃圾桶
    const newTrash = document.createElement('button')
    const newI = document.createElement('i')
    newI.className = 'fas fa-trash'
    newTrash.className = 'trash'
    newTrash.appendChild(newI)

    //把新創的 input 和 select 加到新 div 中
    newDiv.appendChild(newInp1)
    newDiv.appendChild(newInp2)
    newDiv.appendChild(newInp3)
    newDiv.appendChild(newSelect)
    newDiv.appendChild(newTrash)

    //新 div 的出場動畫  //scaleUp 是在 css 中自設的動畫名字
    newDiv.style.animation = 'scaleUp 0.5s ease forwards'

    //把 新 div 插入到頁面中
    form.appendChild(newDiv)
}

//排序(小->大)
function Sort(method) {
    let divs = document.querySelectorAll('.grader')
    let credits = document.querySelectorAll('.class_credit')
    credits.forEach(item => {
        //取得每一項的學分淨值
        x = item.value - 0
        //取得每一項得分淨值
        y = item.nextElementSibling.value - 0
        //取得兩者相乘
        z = x * y
        //把乘積的值以自定義屬性給到父元素 div
        item.parentElement.dataset.product = z
    })
    //Dom上的元素集合是只讀的，沒辦法排序或通過修改陣列去改變位置
    //比較 div 上的自定義屬性大小並做交換
    // for (i = 0; i < div.length - 1; i++) {
    //     for (j = 0; j < div.length - 1 - i; j++) {
    //         if ((div[j].dataset.product - 0) > (div[j + 1].dataset.product - 0)) {
    //             let tem = div[j]
    //             div[j] = div[j + 1]
    //             div[j + 1] = tem
    //         }
    //     }
    // }


    //把 div 元素集合轉成數組
    let divArray = Array.from(divs)

    //依照參數 method 來決定要排序方向，up 是小->大，down是大->小
    //讓這個數組按照自定義屬性值來排序
    if (method === 'up') {
        divArray.sort(function (a, b) {
            return a.dataset.product - b.dataset.product
        })
    } else {
        divArray.sort(function (a, b) {
            return b.dataset.product - a.dataset.product
        })
    }

    //獲取 div 元素集合的父元素，讓排序後的元素再重新添加
    let form = document.querySelector('form')

    //將原本的 div 元素集合移除
    divArray.forEach(item => {
        form.removeChild(item)
    })

    //將排序後的元素集合重新添加到父元素中
    divArray.forEach(item => {
        form.appendChild(item)
    })
}

//重置
function formReset() {
    form.reset();
    form.innerHTML = `
    <div class="grader">
                <input type="text" placeholder="學科項目" class="class_type" list="opt"><!-- 
                 --><input type="text" placeholder="學年" class="class_number"><!-- 
                 --><input type="number" placeholder="學分" min="0" max="6" class="class_credit"><!-- 
                 --><select name="select" class="select">
                    <option value="0.00"></option>
                    <option value="4">A</option>
                    <option value="3.7">A-</option>
                    <option value="3.4">B+</option>
                    <option value="3">B</option>
                    <option value="2.7">B-</option>
                    <option value="2.4">C+</option>
                    <option value="2">C</option>
                    <option value="1.7">C-</option>
                    <option value="1.4">D+</option>
                    <option value="1">D</option>
                    <option value="0.7">D-</option>
                    <option value="0">F</option>
                </select><!-- 
                 --><button class="trash"><i class="fas fa-trash"></i></button>
            </div>

            <div class="grader">
                <input type="text" placeholder="學科項目" class="class_type" list="opt"><!-- 
                 --><input type="text" placeholder="學年" class="class_number"><!-- 
                 --><input type="number" placeholder="學分" min="0" max="6" class="class_credit"><!-- 
                 --><select name="select" class="select">
                    <option value="0.00"></option>
                    <option value="4">A</option>
                    <option value="3.7">A-</option>
                    <option value="3.4">B+</option>
                    <option value="3">B</option>
                    <option value="2.7">B-</option>
                    <option value="2.4">C+</option>
                    <option value="2">C</option>
                    <option value="1.7">C-</option>
                    <option value="1.4">D+</option>
                    <option value="1">D</option>
                    <option value="0.7">D-</option>
                    <option value="0">F</option>
                </select><!-- 
                 --><button class="trash"><i class="fas fa-trash"></i></button>
            </div>

            <div class="grader">
                <input type="text" placeholder="學科項目" class="class_type" list="opt"><!-- 
                 --><input type="text" placeholder="學年" class="class_number"><!-- 
                 --><input type="number" placeholder="學分" min="0" max="6" class="class_credit"><!-- 
                 --><select name="select" class="select">
                    <option value="0.00"></option>
                    <option value="4">A</option>
                    <option value="3.7">A-</option>
                    <option value="3.4">B+</option>
                    <option value="3">B</option>
                    <option value="2.7">B-</option>
                    <option value="2.4">C+</option>
                    <option value="2">C</option>
                    <option value="1.7">C-</option>
                    <option value="1.4">D+</option>
                    <option value="1">D</option>
                    <option value="0.7">D-</option>
                    <option value="0">F</option>
                </select><!-- 
                 --><button class="trash"><i class="fas fa-trash"></i></button>
            </div>
    `
    score.innerHTML = '0.00';
}


//創建觀察者


const obser = new MutationObserver((mutas, obs) => {
    mutas.forEach(item => {
        if (item.type === 'childList') {
            console.log('新增了一條')
        } else if (item.type === 'attributes') {
            console.log('改變了顏色')
        }
    })
})

obser.observe(form, {
    childList: true,
    subtree: true,
    attributes: true
})

//感覺綁 button 上還不如綁 window？
// buttons.forEach(item => {
//     item.addEventListener('click', function (e) {
//         e = e || window.event
//         try {
//             e.preventDefault()
//         } catch (err) {
//             e.returnValue = false
//         }
//         try {
//             e.stopPropagation()
//         } catch (err) {
//             e.cancelBubble = true
//         }
//     })
// })
