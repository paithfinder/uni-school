### dropdownMenu 下拉菜单

**使用方法：**

```
<dropdownMenu :modelList.sync="modelList" :disList="disList" :cityList="cityList" :searchList="searchList" :labelList.sync="labelList" @searchFinish="searchFinish"/>
```

```
import dropdownMenu from '@/uni_modules/piaoyi-dropdownMenu/components/piaoyi-dropdownMenu/piaoyi-dropdownMenu.vue'
export default {
    components: {
        dropdownMenu
    },
    data() {
        return {
        	modelList: [{
        		title: '类型1',
        		children: [{
        			name: '类型1-1',
        			value: '类型1-1'
        		}, {
        			name: '类型1-2',
        			value: '类型1-2'
        		}, {
        			name: '类型1-3',
        			value: '类型1-3'
        		}, {
        			name: '类型1-4',
        			value: '类型1-4'
        		}]
        	}, {
        		title: '类型2',
        		children: [{
        			name: '类型2-1',
        			value: '类型2-1'
        		}, {
        			name: '类型2-2',
        			value: '类型2-2'
        		}, {
        			name: '类型2-3',
        			value: '类型2-3'
        		}, {
        			name: '类型2-4',
        			value: '类型2-4'
        		}]
        	}],
        	disList: [{
        		name: '附近',
        		id: 1
        	}, {
        		name: '3公里',
        		id: 3
        	}, {
        		name: '5公里',
        		id: 5
        	}, {
        		name: '10公里',
        		id: 10
        	}, {
        		name: '15公里',
        		id: 15
        	}, {
        		name: '20公里',
        		id: 20
        	}],
        	cityList: [{
        			id: "420102",
        			name: "江岸区"
        		},
        		{
        			id: "420103",
        			name: "江汉区"
        		}
        	],
        	searchList: [{
        		name: '智能排序',
        		value: 0
        	}, {
        		name: '距离优先',
        		value: 1
        	}],
        	labelList: [{
        		id: '标签1',
        		name: '标签1'
        	}, {
        		id: '标签2',
        		name: '标签2'
        	}, {
        		id: '标签3',
        		name: '标签3'
        	}, {
        		id: '标签3',
        		name: '标签3'
        	}, {
        		id: '标签4',
        		name: '标签4'
        	}],
        }
    },
	methods: {
		<!-- 筛选结果回调 -->
		searchFinish(result) {
			console.log(result)
		}
	}
}
```

#### 事件说明

|   事件名    | 返回值 |      描述      |
| :---------: | :----: | :------------: |
| @searchFinish |   例：{models: "类型1-1,类型1-4,类型2-1", distince: 3, searchIndex: 1, labels: "标签3,标签2,标签1,标签4"}   | 筛选结果回调函数 |

#### Prop

| 参数名称 | 描述                           |
| -------- | ------------------------------ |
| modelList | 标签选项数组，注意prop处加上 .sync，具体格式请看上面的示例 |
| disList | 距离选项数组，具体格式请看上面的示例 |
| cityList | 地区选项数组，具体格式请看上面的示例 |
| searchList | 排序规则数组，具体格式请看上面的示例 |
| labelList | 标签选项数组，注意prop处加上 .sync，具体格式请看上面的示例 |
| duration | 滑动动画时长 |

### 可接定制化组件开发
### 右侧有本人代表作小程序二维码，可以扫码体验
### 如使用过程中有问题或有一些好的建议，欢迎加QQ群互相学习交流：120594820