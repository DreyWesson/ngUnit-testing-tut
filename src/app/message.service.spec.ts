import { MessageService } from './message.service';

describe('MessageService', () => {
  // tslint:disable-next-line: prefer-const
  let service: MessageService;

  beforeEach( () => {
    service = new MessageService();
  });

  it('should have no message to start', () => {
    expect(service.messages.length).toBe(0);
  });

  it('should add message when add is called', () => {
    service.add('message1');
    expect(service.messages.length).toBe(1);
  });

  it('should clear message when clear is called', () => {
    service.add('message1');

    service.clear();

    expect(service.messages.length).toBe(0);
  });
});
