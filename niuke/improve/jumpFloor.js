// 一只青蛙一次可以跳上1级台阶，也可以跳上2级。求该青蛙跳上一个n级的台阶总共有多少种跳法（先后次序不同算不同的结果）。
function jumpFloor(number) {// On^2，递归
    if (number > 2) {
        return jumpFloor(number - 1) + jumpFloor(number - 2)
    } else {
        return number
    }
}

function jumpFloor(num) {// On，for循环
    if (num > 2) {
        var num1 = 1;
        var num2 = 1;
        for (var i = 2; i < num; i++) {
            num2 = num1 + num2;
            num1 = num2 - num1;
        }
        return num1 + num2;
        // 可以使用解构赋值简化
        // [n1, n2] = [n2, n1 + n2]
        // return n2// 确认没问题吧TODO
    } else {
        return num
    }
}

const fb4 = function(){// 闭包（差了1——TODO），去除重复计算的递归
    var mem = [0,1];
    var f = function(n){
        var res = mem[n];
        if(typeof res !== 'number'){
            mem[n] = f(n-1) + f(n-2);
            res = mem[n];
        }
        return res;
    }
    return f;
}();

// 惰性序列？？TODO

// class Matrix
// {
// public:
//     int n;
//     int **m;
//     Matrix(int num)
//     {
//         m=new int*[num];
//         for (int i=0; i<num; i++) {
//             m[i]=new int[num];
//         }
//         n=num;
//         clear();
//     }
//     void clear()
//     {
//         for (int i=0; i<n; ++i) {
//             for (int j=0; j<n; ++j) {
//                 m[i][j]=0;
//             }
//         }
//     }
//     void unit()
//     {
//         clear();
//         for (int i=0; i<n; ++i) {
//             m[i][i]=1;
//         }
//     }
//     Matrix operator=(const Matrix mtx)
//     {
//         Matrix(mtx.n);
//         for (int i=0; i<mtx.n; ++i) {
//             for (int j=0; j<mtx.n; ++j) {
//                 m[i][j]=mtx.m[i][j];
//             }
//         }
//         return *this;
//     }
//     Matrix operator*(const Matrix &mtx)
//     {
//         Matrix result(mtx.n);
//         result.clear();
//         for (int i=0; i<mtx.n; ++i) {
//             for (int j=0; j<mtx.n; ++j) {
//                 for (int k=0; k<mtx.n; ++k) {
//                     result.m[i][j]+=m[i][k]*mtx.m[k][j];
//                 }
//             }
//         }
//         return result;
//     }
// };
// int main(int argc, const char * argv[]) {
//     unsigned int num=2;
//     Matrix first(num);
//     first.m[0][0]=1;
//     first.m[0][1]=1;
//     first.m[1][0]=1;
//     first.m[1][1]=0;
//     int t;
//     cin>>t;
//     Matrix result(num);
//     result.unit();
//     int n=t-2;
//     while (n) {
//         if (n%2) {
//             result=result*first;
//             }
//         first=first*first;
//         n=n/2;
//     }
//     cout<<(result.m[0][0]+result.m[0][1])<<endl;
//     return 0;
// }
// TODO——改成js

module.exports = {
    jumpFloor: jumpFloor
};