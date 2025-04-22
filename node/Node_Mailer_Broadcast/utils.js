function createResult(error, data) {
    const result = {}
    if (error) {
        result['status'] = 'error'
        result['error'] = error
    } else {
        result['status'] = 'success'
        result['data'] = data
    }
    return result
}

function createErrorResult(error) {
    return { status: 'error', error }
}

function createSuccessResult(data) {
    return { status: 'success', data }
}

module.exports = {
    createResult,
    createErrorResult,
    createSuccessResult,
}  