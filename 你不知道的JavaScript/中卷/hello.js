// 生成器
// 使用 Generator 函数生成斐波那契数列
function* fibonacci() {
  let prev = 0;
  let curr = 1;

  while (true) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

const fib = fibonacci();

for (let i = 0; i < 10; i++) {
  console.log(fib.next().value);
}

// Generator 函数实现异步操作的同步化流程控制
function* asyncFlow() {
  try {
    const result1 = yield asyncOperation1(); // 异步操作1
    const result2 = yield asyncOperation2(result1); // 异步操作2，依赖于之前的结果
    const result3 = yield asyncOperation3(result2); // 异步操作3，依赖于之前的结果
    console.log('Final result:', result3);
  } catch (error) {
    console.error('Error:', error);
  }
}

function asyncOperation1() {
  return new Promise(resolve => {
    setTimeout(() => resolve('Result 1'), 1000);
  });
}

function asyncOperation2(input) {
  return new Promise(resolve => {
    setTimeout(() => resolve(`Result 2 based on ${input}`), 1000);
  });
}

function asyncOperation3(input) {
  return new Promise(resolve => {
    setTimeout(() => resolve(`Result 3 based on ${input}`), 1000);
  });
}

const flow = asyncFlow();
const { value, done } = flow.next();

function handleAsyncOperation(result) {
  if (done) {
    return;
  }

  const { value, done } = flow.next(result);
  value.then(handleAsyncOperation).catch(handleError);
}

function handleError(error) {
  flow.throw(error);
}

value.then(handleAsyncOperation).catch(handleError);