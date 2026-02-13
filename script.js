let board = ["","","","","","","","",""];
let active = true;
const status = document.getElementById('status-box');

function handleTap(i) {
    if (board[i] || !active) return;
    board[i] = "X";
    document.querySelectorAll('.cell')[i].innerText = "X";
    
    if (check(board, "X")) {
        end("X");
    } else if (!board.includes("")) {
        end("tie");
    } else {
        active = false;
        status.innerText = "BOT MIKIR DULU...";
        status.classList.add('thinking');
        setTimeout(botMove, 700);
    }
}

function botMove() {
    let move = null;
    // Easy logic (biar user gampang menang)
    if (Math.random() < 0.7) {
        let empty = board.map((v,i)=>v===""?i:null).filter(v=>v!==null);
        move = empty[Math.floor(Math.random()*empty.length)];
    } else {
        move = findBest(board, "O") || findBest(board, "X");
        if (move === null) {
            let empty = board.map((v,i)=>v===""?i:null).filter(v=>v!==null);
            move = empty[Math.floor(Math.random()*empty.length)];
        }
    }

    if (move !== null) {
        board[move] = "O";
        document.querySelectorAll('.cell')[move].innerText = "O";
        if (check(board, "O")) {
            end("O");
        } else if (!board.includes("")) {
            end("tie");
        } else {
            active = true;
            status.innerText = "GILIRAN KAMU (X)";
            status.classList.remove('thinking');
        }
    }
}

function findBest(b, p) {
    const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (let c of wins) {
        let count = c.filter(i => b[i] === p).length;
        let empty = c.find(i => b[i] === "");
        if (count === 2 && empty !== undefined) return empty;
    }
    return null;
}

function check(b, p) {
    const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    return wins.some(c => c.every(i => b[i] === p));
}

function end(res) {
    active = false;
    status.classList.remove('thinking');
    if (res === "X") {
        status.innerText = "KAMU MENANG!";
        setTimeout(startPrank, 1000);
    } else {
        status.innerText = "COBA LAGI!";
        setTimeout(() => location.reload(), 1500);
    }
}

function startPrank() {
    document.getElementById('game-view').style.opacity = "0";
    document.getElementById('game-view').style.transform = "scale(0.8)";
    
    setTimeout(() => {
        document.getElementById('game-view').classList.add('hidden');
        const prank = document.getElementById('prank-overlay');
        prank.style.display = 'flex';
        
        setTimeout(() => { document.getElementById('p-text').innerText = "> Override: LOVE_PROTOCOL_INITIATED"; }, 2000);
        setTimeout(showScrapbook, 4500);
    }, 600);
}

function showScrapbook() {
    document.getElementById('prank-overlay').style.display = 'none';
    const scrapbook = document.getElementById('scrapbook-view');
    scrapbook.style.display = 'flex';
    setTimeout(() => { scrapbook.style.opacity = "1"; }, 50);
}

function handleBook() {
    document.getElementById('cover').classList.toggle('opened');
}