const solveBtn = document.getElementById('solveBtn');
const queenInput = document.getElementById('queenInput');
const solutionContainer = document.getElementById('solutionContainer');
const totalSolutions = document.getElementById('totalSolutions');
const output = document.querySelector('output');

solveBtn.addEventListener('click', solveNQueens);

queenInput.addEventListener('input', setState);

document.addEventListener('DOMContentLoaded', setState);

function setState() {
    output.value = queenInput.value;
}

function solveNQueens() {
    const n = parseInt(queenInput.value);
    const solutions = [];
    solve(0, []);

    totalSolutions.textContent = `Total no. of Solutions: ${solutions.length}`;
    solutionContainer.innerHTML = '';
    if (solutions.length > 0) {
        displaySolution(solutions[Math.floor(Math.random() * solutions.length)]);
    } else {
        solutionContainer.textContent = 'No solutions found.';
    }

    function isSafe(row, col, solution) {
        return solution.every(function(queenCol, queenRow) {
            return col !== queenCol && Math.abs(row - queenRow) !== Math.abs(col - queenCol);
        });
    }

    function solve(row, currentSolution) {
        if (row === n) {
            solutions.push([...currentSolution]);
            return;
        }

        for (let col = 0; col < n; col++) {
            if (isSafe(row, col, currentSolution)) {
                currentSolution.push(col);
                solve(row + 1, currentSolution);
                currentSolution.pop();
            }
        }
    }

    function displaySolution(solution) {
        const chessboard = document.createElement('div');
        chessboard.className = 'chessboard';

        chessboard.style.gridTemplateColumns = `repeat(${n}, 40px)`;
        chessboard.style.gridTemplateRows = `repeat(${n}, 40px)`;

        for (let row = 0; row < n; row++) {
            for (let col = 0; col < n; col++) {
                const cell = document.createElement('div');
                cell.className = `cell ${col === solution[row] ? 'queen' : ''}`;
                chessboard.appendChild(cell);
            }
        }

        solutionContainer.appendChild(chessboard);
    }
}
