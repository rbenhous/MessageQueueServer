import { expect } from 'chai';
import sinon from 'sinon';
import MessageQueueService from "../../src/domain/services/message-queue.service.js";
import MessageQueuesRepository from "../../src/infra/repositories/message-queues.repository.js";
import logger from "../../src/common/logger/console-logger.js";
import Result from "../../src/domain/models/result.model.js";
import assert_equal_results from "../utils/assert-utils.js";

describe('MessageQueueService', function() {
  let service;
  let messageQueuesRepositoryStub;
  let loggerStub;

  before(function() {
    messageQueuesRepositoryStub = sinon.stub(MessageQueuesRepository, 'GetInstance').returns({
      createQueueIfNotExists: sinon.stub(),
      getQueue: sinon.stub()
    });
    service = new MessageQueueService();
    loggerStub = sinon.stub(logger);
  });

  describe('addMessage', function() {
    it('should add a message to the queue successfully', async function() {
      // Arrange
      const queueStub = {
        hasOverflow: sinon.stub().resolves(false),
        enqueue: sinon.stub().resolves()
      };
      messageQueuesRepositoryStub().getQueue.resolves(queueStub);
      const expectedResult = Result.createSuccess();
      
      // Act
      const result = await service.addMessage('testQueue', 'testMessage');

      // Assert
      assert_equal_results(result, expectedResult);
      expect(queueStub.enqueue.calledOnce).to.be.true;
      expect(loggerStub.info.calledOnce).to.be.true;
    });

    it('should return queue not found error', async function() {
      // Arrange
      messageQueuesRepositoryStub().getQueue.resolves(null);
      const expectedResult = Result.createQueueNotFoundError('testQueue');
      
      // Act
      const result = await service.addMessage('testQueue', 'testMessage');

      // Assert
      assert_equal_results(result, expectedResult);
      expect(loggerStub.error.calledOnce).to.be.true;
    });

    it('should return queue overflow error', async function() {
      // Arrange
      const queueStub = {
        hasOverflow: sinon.stub().resolves(true)
      };
      messageQueuesRepositoryStub().getQueue.resolves(queueStub);
      const expectedResult = Result.createOverflowError('testQueue');

      // Act
      const result = await service.addMessage('testQueue', 'testMessage');

      // Assert
      assert_equal_results(result, expectedResult);
      expect(loggerStub.warning.calledOnce).to.be.true;
    });
  });

  describe('getMessage', function() {
    it('should dequeue a message from the queue successfully', async function() {
      // Arrange
      const queueStub = {
        hasUnderflow: sinon.stub().resolves(false),
        dequeue: sinon.stub().resolves('testMessage')
      };
      messageQueuesRepositoryStub().getQueue.resolves(queueStub);
      const expectedResult = Result.createSuccess('testMessage');

      // Act
      const result = await service.getMessage('testQueue');

      // Assert
      assert_equal_results(result, expectedResult);
    });

    it('should return queue not found error', async function() {
      // Arrange
      messageQueuesRepositoryStub().getQueue.resolves(null);
      const expectedResult = Result.createQueueNotFoundError('testQueue');
      
      // Act
      const result = await service.getMessage('testQueue');

      // Assert
      assert_equal_results(result, expectedResult);
    });

    it('should return queue underflow success', async function() {
      // Arrange
      const queueStub = {
        hasUnderflow: sinon.stub().resolves(true)
      };
      messageQueuesRepositoryStub().getQueue.resolves(queueStub);
      const expectedResult = Result.createUnderflowSuccess('testQueue');
      
      // Act
      const result = await service.getMessage('testQueue');

      // Assert
      assert_equal_results(result, expectedResult)
    });

    it('should handle unexpected errors gracefully', async function() {
      // Arrange
      const error = new Error('unexpected error');
      messageQueuesRepositoryStub().getQueue.rejects(error);
      const expectedResult = Result.createError(error);
      
      // Act
      const result = await service.getMessage('testQueue');

      // Assert
      assert_equal_results(result, expectedResult);
    });
  });
});
