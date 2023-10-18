import { HttpService } from '@midwayjs/axios';
import { Controller, Post, SetHeader, Inject, Body } from '@midwayjs/core';
import { ApiProperty } from '@midwayjs/swagger';

class GptSummaryDTO {
  @ApiProperty({ description: '文章内容', example: '', required: true })
  content: string;
}

@Controller('/gpt')
export class GptController {
  @Inject()
  httpService: HttpService;

  @Post('/')
  @SetHeader({
    'Content-Type': 'text/event-stream',
  })
  async summary(@Body() body: GptSummaryDTO) {
    const { content } = body;
    const data = {
      stream: true,
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content:
            '阅读本篇文章，并将该文章总结为一句话，不能超过100个字: ' + content,
        },
      ],
    };
    const accessToken = 'pk-this-is-a-real-free-pool-token-for-everyone';
    const url = 'https://ai.fakeopen.com/v1/chat/completions';
    const res = await this.httpService.post(url, data, {
      responseType: 'stream',
      timeout: 0,
      headers: {
        contentType: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  }
}
