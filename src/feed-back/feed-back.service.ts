import { Injectable } from '@nestjs/common';
import { CreateFeedBackInput } from './dto/create-feed-back.input';
import { UpdateFeedBackInput } from './dto/update-feed-back.input';

@Injectable()
export class FeedBackService {
  create(createFeedBackInput: CreateFeedBackInput) {
    return 'This action adds a new feedBack';
  }

  findAll() {
    return `This action returns all feedBack`;
  }

  findOne(id: number) {
    return `This action returns a #${id} feedBack`;
  }

  update(id: number, updateFeedBackInput: UpdateFeedBackInput) {
    return `This action updates a #${id} feedBack`;
  }

  remove(id: number) {
    return `This action removes a #${id} feedBack`;
  }
}
