import { expect } from 'chai';

const assert_equal_results = (actual_result, expected_result) => {
  expect(actual_result.success).to.be.equal(expected_result.success);
  expect(actual_result.data).to.be.equal(expected_result.data);
  expect(actual_result.status).to.be.equal(expected_result.status);
  expect(actual_result.error).to.be.equal(expected_result.error);
  expect(actual_result.message).to.be.equal(expected_result.message);
}

export default assert_equal_results;