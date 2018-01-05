## Vue 学习之路
	包含自己的一些心得和闲暇时间写的demos

## 好好学习天天向上
	如何利用好 git，以及熟练使用git 操作

## git使用心得

* .gitignore 文件本身就可以帮我们忽略掉一些文件（夹），例如：module
* git push origin fenzhi 也会将主分支的代码也提交了？| 看来还需要多了解

## 目录

1、notes 主要是自己最初编写的编辑例子
2、vue-chat 本来是想实现 和机器人聊天的，结果百度的那个接口没有能够连接上，不能实现实时对话。sockie好像也还是有问题没有搞清楚
3、vue-koa 是自己模仿大神的例子，用来巩固自己vue和koa的使用，同时加深前后端分离的思想
4、vue-nuxt 是自己在项目需要重构前端时，了解到 SSR 比较好的一个解决方案，调研学习

## 具体

### Nuxt.js

> 服务端渲染，听起来很高大上吧

1、vue-cli 出错 如果提示某个模块不存在，那还可能是vue-cli安装出错了。重装

```js
这个方法可能不怎么靠谱
npm update vue-cli -g

推荐使用这个
npm i vue-cli -g
```

2、vue-server-renderer

> vue 官方的服务端渲染包

nuxt.js 好像就是基于ssr进行开发的。继续了解