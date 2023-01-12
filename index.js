function generate_array() {
    let a = [];
    for (let i = 1; i <= no_bars; i++) {
        let n = Math.random() * 100;
        a.push(Math.floor(n));
    }
    return a;
}

function generate_bars(a) {
    let bars = [];
    for (let i = 0; i < a.length; i++) {
        let div = document.createElement("div");
        div.style.height = a[i] * 4 + "px";
        div.style.width = "8px";
        div.style.backgroundColor = "blue";
        bars.push(div);
    }
    return bars;
}

function add_bars(bars) {
    let content = document.querySelector(".content");
    content.innerHTML = "";
    console.log(content);
    bars.forEach(element => {
        content.appendChild(element);
    });
}

function swap(element1, element2) {
    const style1 = window.getComputedStyle(element1);
    const style2 = window.getComputedStyle(element2);

    const height1 = style1.getPropertyValue("height");
    const height2 = style2.getPropertyValue("height");

    element1.style.height = height2;
    element2.style.height = height1;
}
function change_color(element, color) {
    element.style.backgroundColor = color;
}
async function bubble_sort() {
    let n = a.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - 1 - i; j++) {
            change_color(bars[j], "red");
            change_color(bars[j + 1], "red");

            if (a[j] > a[j + 1]) {
                let temp = a[j];
                a[j] = a[j + 1];
                a[j + 1] = temp;

                swap(bars[j], bars[j + 1]);
            }
            await wait_for_me(speed);
            change_color(bars[j], "blue");
            change_color(bars[j + 1], "blue");

        }
        change_color(bars[n - 1 - i], "green");
    }
}
async function insertion_sort() {
    let n = a.length;
    for (let i = 1; i < n; i++) {
        let key = a[i];
        let j = i - 1;
        while (j >= 0 && a[j] > key) {
            a[j + 1] = a[j];

            change_color(bars[j], "red");
            change_color(bars[j + 1], "red");
            await wait_for_me(speed);

            bars[j + 1].style.height = bars[j].style.height;

            change_color(bars[j], "green");
            change_color(bars[j + 1], "green");

            j = j - 1;
        }
        a[j + 1] = key;
        bars[j + 1].style.height = key * 4 + "px";
    }
}
async function selection_sort() {
    for (let i = 0; i < a.length; i++) {
        let min = i;
        for (let j = i; j < a.length; j++) {

            let f = j;
            let s = min;
            change_color(bars[f], "red");
            change_color(bars[s], "red");
            await wait_for_me(10);
            if (a[j] < a[min]) {
                min = j;
            }
            change_color(bars[f], "blue");
            change_color(bars[s], "blue");
        }


        let temp = a[min];
        a[min] = a[i];
        a[i] = temp;
        swap(bars[min], bars[i]);
        change_color(bars[i], "green");

    }

}
function wait_for_me(milisec) {
    return new Promise(resolve => {
        setTimeout(() => { resolve('') }, milisec);
    })
}
function add_listeners() {
    input1.addEventListener("click", () => {
        no_bars = input1.value;
    })
    input2.addEventListener("click", () => {
        speed = input2.value;
    })
    // eventlistener

    let buttons = document.getElementsByTagName("button");
    let new_array = buttons[0];

    new_array.addEventListener("click", () => {
        a = generate_array();
        bars = generate_bars(a);
        add_bars(bars);
    });


    let bubble_btn = buttons[1];
    bubble_btn.addEventListener("click", bubble_sort);

    let selection_btn = buttons[2];
    selection_btn.addEventListener("click", selection_sort);

    let insertion_btn = buttons[3];
    insertion_btn.addEventListener("click", insertion_sort);

    let merge_btn=buttons[5];
    merge_btn.addEventListener("click",()=>
    {
        console.log(no_bars);
        merge_sort(0,no_bars-1);
        
    })

}
async function merge_sort(l, r) {
    if (l < r) {
        let m=(l+r)/2;
        m=parseInt(m,10);
        merge_sort(l,m);
        merge_sort(m+1,r);
        merge(l,m,r);
    }
}

async function merge(l,m,r)
{
    let n1=m-l+1;
    let n2=r-m;

    let left=[];
    let right=[];

   for (let i = 0; i < n1; i++){
       left[i] = a[l + i];
   }
    for (let j = 0; j < n2; j++){
      right[j] = a[m + 1 + j];
    }

    let i=0,j=0,k=l;
    while(i<left.length && j<right.length)
    {
        change_color(bars[k],"green");
        if(left[i]<right[j])
        {
            a[k]=left[i];
            bars[k].style.height=left[i]*4+"px";
            i++;
        }
        else{
            a[k]=right[j];
            bars[k].style.height=right[j]*4+"px";
            j++;
        }
        k++;
    }

    while(i<left.length)
    {
        a[k]=left[i];
        bars[k].style.height=left[i]*4+"px";
        i++;
        k++;
    }

    while(j<right.length)
    {
        a[k]=right[j];
        bars[k].style.height=right[j]*4+"px";
        j++;
        k++;
    }
}

let input1 = document.getElementById("customRange1");
let input2 = document.getElementById("customRange2");

let no_bars = input1.value;
let speed = input2.value;

let a = generate_array();
let bars = generate_bars(a);
add_bars(bars);

add_listeners();







