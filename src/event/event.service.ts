import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEntity } from './event.entity';
import { EventDTO } from './event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
  ) {}

  async createEvent(eventDTO: EventDTO): Promise<EventEntity> {
    const event = this.eventRepository.create(eventDTO);
    return await this.eventRepository.save(event);
  }

  async getAllEvents(): Promise<EventEntity[]> {
    return await this.eventRepository.find();
  }

  async getEventById(id: number): Promise<EventEntity> {
    const event = await this.eventRepository.findOne({ where: { id } });
    if (!event) {
      throw new Error('Event not found');
    }
    return event;
  }

  async updateEvent(id: number, eventDTO: EventDTO): Promise<EventEntity> {
    const event = await this.getEventById(id);
    Object.assign(event, eventDTO);
    return await this.eventRepository.save(event);
  }

  async deleteEvent(id: number): Promise<void> {
    const event = await this.getEventById(id);
    await this.eventRepository.remove(event);
  }
}
