export class Result<T> {
  // 状态码
  status: string | number;

  // 请求结果信息
  message: string;

  // 数据
  data: T;

  ok(data = null, message = '发送成功') {
    this.status = 'success';
    this.data = data;
    this.message = message;
    return this;
  }

  error(status: number | string = 'error', message = '发送失败') {
    this.status = status;
    this.message = message;
    return this;
  }
}
