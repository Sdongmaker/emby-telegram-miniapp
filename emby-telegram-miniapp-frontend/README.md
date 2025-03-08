# emby-telegram-miniapp-frontend

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
<think>看起来我之前提到的API接口文档文件 `emby-telegram-miniapp-frontend/api-docs.md` 还没有被创建。我需要实际创建这个文件，并在其中包含详细的API接口说明。我将为此项目创建一个全面的API文档。

<function_calls>
<invoke name="file_search">
<parameter name="query">api</parameter>
<parameter name="explanation">搜索项目中是否有任何现有的API相关文件</parameter>
</invoke>
</function_calls>

<function_results>
No matching files found.
</function_results>

我需要从头创建API文档。我将创建一个详细的API接口文档，包括所有可能的后端接口。

<function_calls>
<invoke name="edit_file">
<parameter name="target_file">emby-telegram-miniapp-frontend/api-docs.md</parameter>
<parameter name="instructions">创建一个详细的API接口文档，涵盖前端可能需要的所有后端接口</parameter>
<parameter name="code_edit"># 起点站 API 接口文档

## 文档概述

本文档详细说明了起点站（Emby Telegram Mini App）前端与后端交互的所有API接口。

- **版本**：1.0.0
- **基础URL**：`https://api.qidian.example.com/v1`
- **更新日期**：2023-04-26

## 通用说明

### 请求格式

除非特别说明，所有API请求都应当采用以下格式：

- **请求方法**：GET, POST, PUT, DELETE（根据具体接口而定）
- **内容类型**：`application/json`

### 认证方式

大多数API接口需要认证。认证方式采用 Bearer Token (JWT)，在请求头中携带：

```
Authorization: Bearer {access_token}
```

### 通用响应格式

所有API响应都采用以下通用格式：

```json
{
  "code": 200,           // 状态码，200表示成功
  "message": "成功",      // 状态描述
  "data": {              // 响应数据
    // 具体数据内容，根据接口不同而变化
  },
  "timestamp": 1682502532000  // 服务器时间戳（毫秒）
}
```

### 通用错误码

| 错误码 | 描述 |
|-------|------|
| 200 | 成功 |
| 400 | 请求参数错误 |
| 401 | 未授权（Token无效或已过期） |
| 403 | 权限不足 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |
| 503 | 服务暂时不可用 |
| 1001 | 用户名或密码错误 |
| 1002 | 账户已锁定 |
| 1003 | 余额不足 |
| 1004 | 今日已签到 |
| 1005 | 操作频率超限 |

## 1. 认证接口

### 1.1 用户登录

用户登录并获取访问令牌。

- **URL**: `/auth/login`
- **方法**: `POST`
- **是否需要认证**: 否

#### 请求参数

```json
{
  "username": "user123",   // 用户名
  "password": "password",  // 密码，传输前建议进行MD5/SHA256等加密
  "telegram_id": "123456789"  // Telegram用户ID（可选）
}
```

#### 响应示例

```json
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_in": 86400,  // 过期时间（秒）
    "token_type": "Bearer",
    "user_info": {
      "user_id": 10001,
      "username": "user123",
      "nickname": "起点用户",
      "avatar": "https://api.qidian.example.com/avatars/default.png",
      "role": "user",  // 用户角色：user-普通用户，admin-管理员
      "emby_id": "emby123456",  // Emby用户ID
      "create_time": "2023-01-15T08:30:00Z"  // 注册时间
    }
  },
  "timestamp": 1682502532000
}
```

### 1.2 刷新令牌

使用刷新令牌获取新的访问令牌。

- **URL**: `/auth/refresh`
- **方法**: `POST`
- **是否需要认证**: 否

#### 请求参数

```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 响应示例

```json
{
  "code": 200,
  "message": "刷新成功",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_in": 86400,
    "token_type": "Bearer"
  },
  "timestamp": 1682502532000
}
```

### 1.3 退出登录

注销当前用户的会话。

- **URL**: `/auth/logout`
- **方法**: `POST`
- **是否需要认证**: 是

#### 请求参数

无

#### 响应示例

```json
{
  "code": 200,
  "message": "退出成功",
  "data": null,
  "timestamp": 1682502532000
}
```

## 2. 用户接口

### 2.1 获取用户信息

获取当前登录用户的详细信息。

- **URL**: `/user/info`
- **方法**: `GET`
- **是否需要认证**: 是

#### 请求参数

无

#### 响应示例

```json
{
  "code": 200,
  "message": "成功",
  "data": {
    "user_id": 10001,
    "username": "user123",
    "nickname": "起点用户",
    "avatar": "https://api.qidian.example.com/avatars/default.png",
    "email": "user123@example.com",
    "phone": "138****1234",
    "role": "user",
    "emby_id": "emby123456",
    "emby_username": "emby_user",
    "points": 680,  // 积分数量
    "balance": 50.00,  // 账户余额
    "status": 1,  // 用户状态：1-正常，0-禁用
    "vip_level": 1,  // VIP等级
    "vip_expire": "2023-12-31T23:59:59Z",  // VIP到期时间
    "create_time": "2023-01-15T08:30:00Z",
    "last_login_time": "2023-04-26T10:15:30Z"  // 最后登录时间
  },
  "timestamp": 1682502532000
}
```

### 2.2 修改用户密码

修改当前登录用户的密码。

- **URL**: `/user/password`
- **方法**: `PUT`
- **是否需要认证**: 是

#### 请求参数

```json
{
  "old_password": "old_password",  // 旧密码
  "new_password": "new_password",  // 新密码
  "confirm_password": "new_password"  // 确认新密码
}
```

#### 响应示例

```json
{
  "code": 200,
  "message": "密码修改成功",
  "data": null,
  "timestamp": 1682502532000
}
```

### 2.3 更新用户资料

更新用户的基本资料。

- **URL**: `/user/profile`
- **方法**: `PUT`
- **是否需要认证**: 是

#### 请求参数

```json
{
  "nickname": "新昵称",  // 昵称（可选）
  "avatar": "https://api.qidian.example.com/avatars/custom.png",  // 头像URL（可选）
  "email": "newemail@example.com",  // 邮箱（可选）
  "phone": "13912345678"  // 手机号（可选）
}
```

#### 响应示例

```json
{
  "code": 200,
  "message": "资料更新成功",
  "data": {
    "nickname": "新昵称",
    "avatar": "https://api.qidian.example.com/avatars/custom.png",
    "email": "newemail@example.com",
    "phone": "139****5678"
  },
  "timestamp": 1682502532000
}
```

## 3. 签到接口

### 3.1 执行签到

用户每日签到，获取积分奖励。

- **URL**: `/check-in`
- **方法**: `POST`
- **是否需要认证**: 是

#### 请求参数

无

#### 响应示例

```json
{
  "code": 200,
  "message": "签到成功",
  "data": {
    "points": 20,  // 本次签到获得的积分
    "total_points": 680,  // 签到后的总积分
    "check_in_days": 5,  // 连续签到天数
    "next_reward": 30,  // 明日签到可获得的积分
    "check_in_time": "2023-04-26T10:30:00Z"  // 签到时间
  },
  "timestamp": 1682502532000
}
```

### 3.2 获取签到历史

获取用户的签到历史记录。

- **URL**: `/check-in/history`
- **方法**: `GET`
- **是否需要认证**: 是

#### 请求参数

| 参数名 | 必选 | 类型 | 说明 |
|------|------|------|------|
| year | 否 | integer | 查询年份，默认当前年 |
| month | 否 | integer | 查询月份，默认当前月 |

#### 响应示例

```json
{
  "code": 200,
  "message": "成功",
  "data": {
    "year": 2023,
    "month": 4,
    "days": [1, 2, 3, 5, 10, 15, 20, 25, 26],  // 该月签到的日期
    "total_days": 9,  // 本月已签到天数
    "continuous_days": 2,  // 当前连续签到天数
    "max_continuous_days": 5,  // 最长连续签到天数
    "total_points": 180,  // 本月签到获得的总积分
    "today_checked": true,  // 今日是否已签到
    "check_in_details": [
      {
        "date": "2023-04-01",
        "points": 20,
        "time": "2023-04-01T08:15:30Z"
      },
      {
        "date": "2023-04-02",
        "points": 20,
        "time": "2023-04-02T09:20:10Z"
      }
      // ... 更多签到详情
    ]
  },
  "timestamp": 1682502532000
}
```

### 3.3 获取签到规则

获取签到规则和奖励信息。

- **URL**: `/check-in/rules`
- **方法**: `GET`
- **是否需要认证**: 否

#### 请求参数

无

#### 响应示例

```json
{
  "code": 200,
  "message": "成功",
  "data": {
    "base_points": 10,  // 基础积分奖励
    "continuous_rewards": [
      {
        "days": 3,  // 连续签到3天
        "points": 15  // 可获得15积分
      },
      {
        "days": 7,
        "points": 20
      },
      {
        "days": 15,
        "points": 30
      },
      {
        "days": 30,
        "points": 50
      }
    ],
    "points_usage": [
      {
        "name": "兑换VIP天数",
        "rate": "100积分=1天VIP"
      },
      {
        "name": "兑换余额",
        "rate": "1000积分=1元余额"
      }
    ]
  },
  "timestamp": 1682502532000
}
```

## 4. 余额接口

### 4.1 获取余额信息

获取用户的余额信息和近期交易记录。

- **URL**: `/balance`
- **方法**: `GET`
- **是否需要认证**: 是

#### 请求参数

无

#### 响应示例

```json
{
  "code": 200,
  "message": "成功",
  "data": {
    "balance": 50.00,  // 当前余额
    "frozen_balance": 0.00,  // 冻结余额
    "total_recharge": 100.00,  // 累计充值金额
    "total_consumption": 50.00,  // 累计消费金额
    "recent_transactions": [
      {
        "id": "T20230425001",
        "type": "recharge",  // 类型：recharge-充值，consume-消费，refund-退款
        "amount": 50.00,
        "description": "支付宝充值",
        "status": "success",  // 状态：success-成功，pending-处理中，failed-失败
        "create_time": "2023-04-25T14:30:00Z"
      },
      {
        "id": "T20230420002",
        "type": "consume",
        "amount": -30.00,
        "description": "续费VIP会员1个月",
        "status": "success",
        "create_time": "2023-04-20T10:15:00Z"
      }
    ]
  },
  "timestamp": 1682502532000
}
```

### 4.2 余额充值

创建充值订单。

- **URL**: `/balance/recharge`
- **方法**: `POST`
- **是否需要认证**: 是

#### 请求参数

```json
{
  "amount": 50.00,  // 充值金额
  "payment_method": "alipay",  // 支付方式：alipay-支付宝，wechat-微信支付
  "client_ip": "192.168.1.1",  // 客户端IP（可选）
  "return_url": "https://t.me/emby_mini_app"  // 支付完成后的回跳URL（可选）
}
```

#### 响应示例

```json
{
  "code": 200,
  "message": "订单创建成功",
  "data": {
    "order_id": "R20230426001",
    "amount": 50.00,
    "payment_method": "alipay",
    "payment_url": "https://api.qidian.example.com/pay/alipay?order_id=R20230426001",  // 支付URL
    "qr_code": "data:image/png;base64,iVBORw0KGgoAAAANSUh...",  // 支付二维码（Base64）
    "expire_time": "2023-04-26T11:30:00Z"  // 订单过期时间
  },
  "timestamp": 1682502532000
}
```

### 4.3 查询充值订单状态

查询充值订单的状态。

- **URL**: `/balance/recharge/status`
- **方法**: `GET`
- **是否需要认证**: 是

#### 请求参数

| 参数名 | 必选 | 类型 | 说明 |
|------|------|------|------|
| order_id | 是 | string | 订单ID |

#### 响应示例

```json
{
  "code": 200,
  "message": "成功",
  "data": {
    "order_id": "R20230426001",
    "amount": 50.00,
    "payment_method": "alipay",
    "status": "paid",  // 状态：created-已创建，paid-已支付，failed-失败，expired-已过期
    "pay_time": "2023-04-26T11:15:30Z",  // 支付时间
    "trade_no": "2023042622001414511234567890"  // 第三方支付平台交易号
  },
  "timestamp": 1682502532000
}
```

### 4.4 获取交易历史

获取用户的交易记录历史。

- **URL**: `/balance/transactions`
- **方法**: `GET`
- **是否需要认证**: 是

#### 请求参数

| 参数名 | 必选 | 类型 | 说明 |
|------|------|------|------|
| page | 否 | integer | 页码，默认1 |
| page_size | 否 | integer | 每页大小，默认20，最大50 |
| type | 否 | string | 交易类型：all-全部，recharge-充值，consume-消费，refund-退款 |
| start_date | 否 | string | 开始日期，格式：YYYY-MM-DD |
| end_date | 否 | string | 结束日期，格式：YYYY-MM-DD |

#### 响应示例

```json
{
  "code": 200,
  "message": "成功",
  "data": {
    "total": 25,  // 总记录数
    "page": 1,
    "page_size": 20,
    "total_pages": 2,
    "transactions": [
      {
        "id": "T20230425001",
        "type": "recharge",
        "amount": 50.00,
        "description": "支付宝充值",
        "status": "success",
        "create_time": "2023-04-25T14:30:00Z",
        "order_id": "R20230425001",
        "trade_no": "2023042522001414511234567890"  // 第三方支付平台交易号（仅充值和退款有）
      },
      // ...更多交易记录
    ]
  },
  "timestamp": 1682502532000
}
```

## 5. Emby服务接口

### 5.1 获取Emby服务状态

获取Emby服务的运行状态。

- **URL**: `/emby/status`
- **方法**: `GET`
- **是否需要认证**: 是

#### 请求参数

无

#### 响应示例

```json
{
  "code": 200,
  "message": "成功",
  "data": {
    "status": "online",  // 状态：online-在线，offline-离线，maintenance-维护中
    "version": "4.7.5.0",  // Emby服务器版本
    "server_url": "https://emby.qidian.example.com",  // Emby服务器URL
    "total_users": 1000,  // 总用户数
    "online_users": 120,  // 当前在线用户数
    "total_libraries": 15,  // 总媒体库数量
    "total_movies": 5000,  // 电影总数
    "total_series": 800,  // 剧集总数
    "recent_added": [  // 最近添加的媒体
      {
        "id": "12345",
        "name": "流浪地球2",
        "type": "movie",
        "poster": "https://emby.qidian.example.com/Items/12345/Images/Primary",
        "year": 2023,
        "added_time": "2023-04-20T08:00:00Z"
      },
      // ...更多最近添加
    ],
    "system_messages": [  // 系统消息/公告
      {
        "id": "msg001",
        "type": "info",  // 类型：info-信息，warning-警告，error-错误
        "title": "服务器升级通知",
        "content": "服务器将于2023年5月1日凌晨2点进行例行维护，预计2小时内完成。",
        "create_time": "2023-04-25T10:00:00Z"
      }
    ]
  },
  "timestamp": 1682502532000
}
```

### 5.2 获取用户的Emby账户信息

获取当前用户的Emby账户详细信息。

- **URL**: `/emby/user`
- **方法**: `GET`
- **是否需要认证**: 是

#### 请求参数

无

#### 响应示例

```json
{
  "code": 200,
  "message": "成功",
  "data": {
    "emby_id": "emby123456",
    "emby_username": "emby_user",
    "status": "active",  // 状态：active-正常，disabled-禁用
    "plan": "普通会员",  // 套餐/计划名称
    "expire_time": "2023-12-31T23:59:59Z",  // 会员到期时间
    "max_devices": 2,  // 最大设备数量
    "current_devices": 1,  // 当前使用的设备数
    "devices": [  // 已登录的设备
      {
        "id": "device001",
        "name": "iPhone 13",
        "client": "Infuse",
        "last_active": "2023-04-26T09:30:00Z"
      }
    ],
    "statistics": {  // 用户观影统计
      "watched_movies": 120,  // 已观看电影数
      "watched_episodes": 500,  // 已观看剧集数
      "favorite_genres": ["科幻", "动作", "冒险"],  // 喜爱的类型
      "total_watch_time": 18000  // 总观看时长（分钟）
    },
    "connectivity_guide": {  // 连接指南
      "server_url": "https://emby.qidian.example.com",
      "username": "emby_user",
      "guides": [
        {
          "platform": "iOS",
          "app_name": "Infuse",
          "download_url": "https://apps.apple.com/app/infuse-7/id1136220934",
          "guide_url": "https://docs.qidian.example.com/guide/ios-infuse"
        },
        // ...更多平台指南
      ]
    }
  },
  "timestamp": 1682502532000
}
```

### 5.3 续费Emby会员

续费Emby会员服务。

- **URL**: `/emby/renew`
- **方法**: `POST`
- **是否需要认证**: 是

#### 请求参数

```json
{
  "plan_id": "plan_monthly",  // 套餐ID：plan_monthly-月度，plan_quarterly-季度，plan_yearly-年度
  "payment_method": "balance",  // 支付方式：balance-余额支付，alipay-支付宝，wechat-微信支付
  "coupon_code": "NEWYEAR10"  // 优惠券代码（可选）
}
```

#### 响应示例

```json
{
  "code": 200,
  "message": "续费成功",
  "data": {
    "order_id": "E20230426001",
    "plan_name": "月度会员",
    "original_price": 30.00,  // 原价
    "discount": 3.00,  // 折扣金额
    "actual_price": 27.00,  // 实际支付
    "payment_method": "balance",
    "payment_status": "paid",  // 支付状态
    "old_expire_time": "2023-05-31T23:59:59Z",  // 旧到期时间
    "new_expire_time": "2023-06-30T23:59:59Z"  // 新到期时间
  },
  "timestamp": 1682502532000
}
```

### 5.4 获取可用套餐列表

获取所有可用的Emby会员套餐。

- **URL**: `/emby/plans`
- **方法**: `GET`
- **是否需要认证**: 否

#### 请求参数

无

#### 响应示例

```json
{
  "code": 200,
  "message": "成功",
  "data": {
    "plans": [
      {
        "id": "plan_monthly",
        "name": "月度会员",
        "price": 30.00,
        "duration": 1,  // 时长（月）
        "max_devices": 2,  // 最大设备数
        "features": [
          "全站资源无限制观看",
          "最多同时2台设备在线",
          "4K资源"
        ],
        "discount": 0,  // 折扣百分比
        "is_popular": false  // 是否热门套餐
      },
      {
        "id": "plan_quarterly",
        "name": "季度会员",
        "price": 80.00,  // 总价
        "original_price": 90.00,  // 原价（月费×3）
        "duration": 3,
        "max_devices": 3,
        "features": [
          "全站资源无限制观看",
          "最多同时3台设备在线",
          "4K资源"
        ],
        "discount": 11,  // 相比月费的折扣百分比
        "is_popular": true
      },
      {
        "id": "plan_yearly",
        "name": "年度会员",
        "price": 298.00,
        "original_price": 360.00,
        "duration": 12,
        "max_devices": 5,
        "features": [
          "全站资源无限制观看",
          "最多同时5台设备在线",
          "4K资源",
          "专属客服"
        ],
        "discount": 17,
        "is_popular": false
      }
    ],
    "active_promotions": [  // 当前活动促销
      {
        "id": "promo_spring",
        "name": "春季特惠",
        "description": "春季特惠活动，全场套餐8.8折",
        "discount": 12,  // 折扣百分比
        "start_time": "2023-04-01T00:00:00Z",
        "end_time": "2023-04-30T23:59:59Z",
        "coupon_code": "SPRING2023"  // 使用的优惠码
      }
    ]
  },
  "timestamp": 1682502532000
}
```

## 6. 公益项目接口

### 6.1 获取公益项目列表

获取所有公益项目列表。

- **URL**: `/charity/projects`
- **方法**: `GET`
- **是否需要认证**: 否

#### 请求参数

| 参数名 | 必选 | 类型 | 说明 |
|------|------|------|------|
| page | 否 | integer | 页码，默认1 |
| page_size | 否 | integer | 每页大小，默认10，最大20 |
| status | 否 | string | 项目状态：all-全部，ongoing-进行中，completed-已完成 |

#### 响应示例

```json
{
  "code": 200,
  "message": "成功",
  "data": {
    "total": 8,
    "page": 1,
    "page_size": 10,
    "total_pages": 1,
    "projects": [
      {
        "id": "project001",
        "title": "山区儿童图书馆建设",
        "cover_image": "https://api.qidian.example.com/charity/images/project001.jpg",
        "brief": "为山区学校建设图书馆，给孩子们提供阅读的机会",
        "target_amount": 10000.00,  // 目标金额
        "current_amount": 8500.00,  // 当前筹集金额
        "donor_count": 120,  // 捐赠人数
        "progress": 85,  // 进度百分比
        "status": "ongoing",  // 状态：ongoing-进行中，completed-已完成
        "start_time": "2023-03-01T00:00:00Z",
        "end_time": "2023-05-31T23:59:59Z"
      },
      // ...更多项目
    ]
  },
  "timestamp": 1682502532000
}
```

### 6.2 获取公益项目详情

获取单个公益项目的详细信息。

- **URL**: `/charity/projects/{project_id}`
- **方法**: `GET`
- **是否需要认证**: 否

#### 请求参数

| 参数名 | 必选 | 类型 | 说明 |
|------|------|------|------|
| project_id | 是 | string | 项目ID |

#### 响应示例

```json
{
  "code": 200,
  "message": "成功",
  "data": {
    "id": "project001",
    "title": "山区儿童图书馆建设",
    "cover_image": "https://api.qidian.example.com/charity/images/project001.jpg",
    "images": [
      "https://api.qidian.example.com/charity/images/project001_1.jpg",
      "https://api.qidian.example.com/charity/images/project001_2.jpg"
    ],
    "brief": "为山区学校建设图书馆，给孩子们提供阅读的机会",
    "description": "山区学校的孩子们缺少阅读资源，通过本项目将为XX省XX县的5所山区小学建设图书馆，每个图书馆配备1000册图书...",
    "target_amount": 10000.00,
    "current_amount": 8500.00,
    "donor_count": 120,
    "progress": 85,
    "status": "ongoing",
    "organization": {
      "name": "爱心助学协会",
      "logo": "https://api.qidian.example.com/charity/org/logo1.png",
      "description": "爱心助学协会成立于2010年，致力于改善贫困地区教育条件...",
      "certificate": "民非证字[2010]第001号"
    },
    "milestones": [  // 项目里程碑
      {
        "title": "项目启动",
        "time": "2023-03-01T00:00:00Z",
        "description": "项目正式启动，开始筹集资金"
      },
      {
        "title": "第一阶段采购",
        "time": "2023-04-15T00:00:00Z",
        "description": "完成第一批图书采购，共500册"
      }
    ],
    "updates": [  // 项目进展更新
      {
        "id": "update001",
        "title": "第一批图书已送达",
        "content": "感谢大家的爱心捐助，第一批500册图书已于4月20日送达XX小学...",
        "images": [
          "https://api.qidian.example.com/charity/updates/update001_1.jpg"
        ],
        "time": "2023-04-22T10:00:00Z"
      }
    ],
    "donors": [  // 捐赠者列表（最新10位）
      {
        "nickname": "爱心用户",
        "avatar": "https://api.qidian.example.com/avatars/default.png",
        "amount": 100.00,
        "message": "希望孩子们能有更好的学习环境",
        "time": "2023-04-25T15:30:00Z"
      }
    ],
    "start_time": "2023-03-01T00:00:00Z",
    "end_time": "2023-05-31T23:59:59Z",
    "contact": {
      "name": "项目负责人：张老师",
      "phone": "010-12345678",
      "email": "project@charity.org"
    }
  },
  "timestamp": 1682502532000
}
```

### 6.3 捐赠公益项目

向公益项目进行捐赠。

- **URL**: `/charity/donate`
- **方法**: `POST`
- **是否需要认证**: 是

#### 请求参数

```json
{
  "project_id": "project001",  // 项目ID
  "amount": 100.00,  // 捐赠金额
  "payment_method": "balance",  // 支付方式：balance-余额支付，alipay-支付宝，wechat-微信支付
  "message": "希望孩子们能有更好的学习环境",  // 留言（可选）
  "is_anonymous": false  // 是否匿名捐赠（可选，默认false）
}
```

#### 响应示例

```json
{
  "code": 200,
  "message": "捐赠成功",
  "data": {
    "donation_id": "D20230426001",
    "project_id": "project001",
    "project_title": "山区儿童图书馆建设",
    "amount": 100.00,
    "payment_method": "balance",
    "payment_status": "paid",
    "message": "希望孩子们能有更好的学习环境",
    "is_anonymous": false,
    "donate_time": "2023-04-26T11:45:00Z",
    "certificate": {  // 捐赠证书
      "id": "C20230426001",
      "url": "https://api.qidian.example.com/charity/certificates/C20230426001.pdf"
    }
  },
  "timestamp": 1682502532000
}
```

### 6.4 获取用户捐赠历史

获取当前用户的捐赠历史记录。

- **URL**: `/charity/donations`
- **方法**: `GET`
- **是否需要认证**: 是

#### 请求参数

| 参数名 | 必选 | 类型 | 说明 |
|------|------|------|------|
| page | 否 | integer | 页码，默认1 |
| page_size | 否 | integer | 每页大小，默认10，最大20 |

#### 响应示例

```json
{
  "code": 200,
  "message": "成功",
  "data": {
    "total": 5,
    "page": 1,
    "page_size": 10,
    "total_pages": 1,
    "total_amount": 350.00,  // 总捐赠金额
    "donations": [
      {
        "donation_id": "D20230426001",
        "project_id": "project001</think>
