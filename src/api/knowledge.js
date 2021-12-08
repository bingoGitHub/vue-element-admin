import request from '@/utils/request'

export function listKnowledgeType() {
  return request({
    url: 'http://localhost:18080/knowledge_type/',
    method: 'get'
  })
}

export function createKnowledgeType(data) {
  return request({
    url: 'http://localhost:18080/knowledge_type/',
    method: 'post',
    data
  })
}

export function deleteKnowledgeType(id) {
  return request({
    url: 'http://localhost:18080/knowledge_type/' + id,
    method: 'delete'
  })
}

export function listKnowledge() {
  return request({
    url: 'http://localhost:18080/knowledge/',
    method: 'get'
  })
}

export function createKnowledge(data) {
  return request({
    url: 'http://localhost:18080/knowledge/',
    method: 'post',
    data
  })
}

export function deleteKnowledge(id) {
  return request({
    url: 'http://localhost:18080/knowledge/' + id,
    method: 'delete'
  })
}
