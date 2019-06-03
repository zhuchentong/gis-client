# gis-client

## 更新信息

### 2019-06-03 v0.1.18
#### 修复
  * 过滤重复加载图层

### 2019-06-03 v0.1.17
#### 修复
  * 为防止加载图层时，因为看开了地形（等高线）,导致很小的图层将摄像机镜头拉入地下的异常，暂时去掉自动飞行至图层功能


### 2019-06-02 v0.1.16
#### 修复
  * 首页排版布局
  * 外业任务打点异常处理
  * 关闭图层组管理功能


### 2019-05-30 v0.1.15
#### 修复
  * 登录页面重新排版
  * 首页排版布局
  * 系统窗口尺寸更改

### 2019-05-30 v0.1.15
#### 修复
##### 一张图系统
  * 参与绘制交互的所有操作，考虑地形，三维场景，并优化绘制方案

### 2019-05-30 v0.1.14
#### 修复
##### 一张图系统
  * 收益分析，展示基础地价信息
  * 隐患点文字信息位置没有贴地
  * 修改图层属性表行点击的时候,请求了错误的图层存储空间

### 2019-05-29 v0.1.13
#### 修复
##### 一张图系统
  * 高亮区域显示逻辑更改，绘制模式下关闭高亮显示区域
  * 点击数据行视角切换
  * 修复面积测量，多边形没有贴地，中心点文字没有贴地的问题
  * 优化，关闭三角测量之后，pick label 回调函数逻辑关闭。

### 2019-05-27 v0.1.12
#### 修复
##### 一张图系统
  * 收益分析，增加成交价格录入和计算
  * 地块选中效果，弥补选中面后，面的外边框太细看不清。
  * 更改选中地块高亮绘制方式，提升响应速度。


### 2019-05-27 v0.1.11
#### 修复
##### 一张图系统
  * 修复平整量计算方法

### 2019-05-27 v0.1.10
#### 修复
##### 一张图系统
  * 修复图层地块选中效果丢失


### 2019-05-26 v0.1.9
#### 新功能
#### 修复
##### 一张图系统
  * 修复【计算】收益分析，WKT数据与后台交互请求方式错误


### 2019-05-26 v0.1.8
#### 新功能
  *  测量增加平整量计算
  *  图层控制增加三维图层透明度更改
  *  增加主界面修改用户密码的功能
  *  增加消息通知功能
#### 修复
  * 修复系统用户注销无法关闭子系统的问题
##### 一张图系统
  * 修正地图绘制交互按钮功能问题
##### 业务系统
  * 修复业务系统审批人员不能看到审批按钮的问题



### 2019-05-23 v0.1.7
#### 新功能
  * 【测量】增加三角测量工具
  * 【检测】 增加地块检测功能
  * 增加地块选中时，高亮展示
  * 增加图层属性表数据行点击，地块高亮的展示
#### 修复
##### 一张图系统
  * 修复检测数据分析，后台数据已更新，但页面数据未刷新的问题
  
##### 统计模块
  * 修改统计模块各页面数据统计维度，原来没有数据值的维度全部展示出来

### 2019-05-23 v0.1.6
#### 新功能
  
#### 修复
##### 一张图系统
  * 修复图层数据表堆叠的展示的问题
  * 图层有关的编码值转换为中文汉字
  * 【检索】 地块检索修复单个number类型的值未检测到数据的问题。
##### 统计模块
  * 修改饼图图例颜色
  * 修改饼图文字提示，文字过长被遮挡的问题



### 2019-05-22 v0.1.5
#### 新功能
  * 增加修改密码功能
  * 增加窗口控制
#### 修复
##### 一张图系统
  *  优化：优化一张图系统资源内存分配方式,提升系统反应速度
  * 【检索】修复辅助选址，重置按钮不生效。
  * 【计算】修复房屋成本计算，费用项重复计算的问题
  * 【检测】选择检测项增加未选择校验并提示
  * 【项目】修复查看详情，跳转到业务系统所查询的案件并不是所点击的项目详情
  * 【外业】修复查看详情，跳转到外业系统查看的数据并不是所点击的外业详情

### 2019-05-22 v0.1.4
#### 新功能

#### 修复
  * 修复建筑信息图层表属性，没有根据建筑检索条件过滤的问题

### 2019-05-21 v0.1.3
#### 新功能

#### 修复
  * 一张图检索用到的图层关系设置
  * 一次勾选一个图层组，图层属性表没有全部加载的问题
  * 点击绘制区域功能，再点击 × 按钮，再次绘制会导致点与点之间的线不能绘制成功的问题
  * 

### 2019-05-20
#### 新功能
  * 地图罗盘控制
  * 比例尺显示
#### 修复
  * 修复业务上传的图层无法展示的问题
  * 修改检测模块的接口调用
  * 修改统计模块饼状图交互的样式
  * 修改一张图检索模块，图层关联方式
  * 修改统计模块隐患点等级图例排序，图例颜色
  * 修改图层--地类图斑样式
  * 其他Bug修复


## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
