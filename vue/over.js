视野圆形，地方战机从四面八方过来

//被射死
function dieOfBullet() {
	//被射中爆炸还是坠机，爆炸则原子弹爆炸一样炸死一屏，否则坠机不加分
	over();
}

//被撞死
function dieOfCollide() {
	//撞死一只，得一分
	+1
	over();
}

//自爆而死
function dieOfCollide() {
	//原子弹炸死一屏，当前有几只就加几
	+n
	over();
}

//计分，停止画面（新启线程？）
function over() {
	//子弹飞完停止画面，子弹有效射程，在路上的当前还看不到的飞机
}