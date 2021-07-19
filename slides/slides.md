---
# try also 'default' to start simple
theme: seriph
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: https://source.unsplash.com/collection/94734566/1920x1080
# apply any windi css classes to the current slide
class: 'text-center'
# https://sli.dev/custom/highlighters.html
highlighter: shiki
# some information about the slides, markdown enabled
---

# Elastic Workshop

By Doron Tsur


<!--
-->

---

# What will we learn? 

<br>

- 📝 **Introduction to ElasticSearch** - ELK stack, ElasticSearch Architecture
- 📄 **Documents** - Elastic basic CRUD
- 🌉 **Mapping** - The schema for our documents
- 🔍 **Searching** - The real deal
- 🔮 **Conclusion** - WrapUp, Where to go from here 
<br>
<br>

<v-click>
<h2>Get The DATA !! tinyurl.com/4zfjzppk</h2> 
</v-click>

<!--
-->


---

# What is elastic search?
<v-click>
<div>
<div>Elastic Search is a real time analytics and search engine.</div> 
<div>Initial it bacme famouse for it's distributed full text search capabilites. </div>
</div>
</v-click>
<img src="/elasticsearch.png" class="center"/>

<style>
.center {
  margin: auto;
  width: 50%;
  padding: 10px;
}
</style>


---

# Elastic Stack

<img src="/elk-stack.svg" class="center"/>
<style>
.center {
  margin: auto;
  width: 50%;
  padding: 10px;
}
</style>
<!-- 
TODO: Add get the data
dual licensing
-->


---

# Elastic Architecture - P1

<img src="/cluster.webp" class="center"/>
<style>
.center {
  margin: auto;
  width: 85%;
  padding: 10px;
}
</style>

<!-- 
TODO: Add Image of an elastic Cluster detailed
- document 
- indexing 
- sharding 
- nodes
- shard replica
- snapshots - reindex
- roles
-->

---

# Elastic Architecture - P2

<img src="/node.png" class="center"/>
<style>
.center {
  margin: auto;
  width: 85%;
  padding: 10px;
}
</style>

---

# Elastic Architecture - P3


<div>
<img src="/lucene.png" class="center"/>
</div>

<v-click>
<div>
<img src="/inverted.png" class="center-big"/>
</div>
</v-click>


<style>
.center {
  margin: auto;
  width: 30%;
  padding: 10px;
}

.center-big {
  margin: auto;
  width: 70%;
  padding: 10px;
}
</style>

<!-- 
-->

---

# How does elastic reads and writes?

<br>
<br>

- 📝 **Routing read requests** - ```hash(doc_id) % number_of_shards```
- 📄 **Handling write collisions** - optimistic concurrency control (_primary_term, _seq_no)


```ts
POST /products/_update/100?if_primary_term=X&if_seq_no=X
{
  "doc": {
    "in_stock": 123
  }
}
```
<br>

---

# Running elastic as a cache or data store? 

<div class="gallery"> 
<div class="row">
<div class="column"><img src="/redis.png" class="gallery__img"/></div>
<div class="column"><img src="/scylla.png" class="gallery__img"/></div>
</div>
<div class="row">
<div class="column"><img src="/cassandra.png" class="gallery__img"/></div>
<div class="column"><img src="/mongo.png" class="gallery__img"/></div>
</div>
</div>

<style>
/* .center {
  margin: auto;
  width: 50px;
  paddi
  ng: 10px;
} */

.row {
  display: flex;
  flex-wrap: wrap;
  padding: 0 4px;
}

/* Create four equal columns that sits next to each other */
.column {
  flex: 25%;
  max-width: 25%;
  padding: 0 4px;
}

.column img {
  margin-top: 8px;
  vertical-align: middle;
  width: 100%;
}

/* Responsive layout - makes a two column-layout instead of four columns */
@media screen and (max-width: 800px) {
  .column {
    flex: 50%;
    max-width: 50%;
  }
}

/* Responsive layout - makes the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 600px) {
  .column {
    flex: 100%;
    max-width: 100%;
  }
}
</style>

---

# Running elastic search in k8s?

<div> 
<img src="/k8s.jpg" class="center"/>
</div>

<style>
.center {
  margin: auto;
  width: 60%;
  padding: 10px;
}
</style>


<!-- 
-->

---

# Demo - document handling 

<div> 
<img src="/demo.png" class="center"/>
</div>

<style>
.center {
  margin: auto;
  width: 60%;
  padding: 10px;
}
</style>

---

# Workshop Mappings - What are mappings?

- Maping is the process of defining a document schema within elastic
- Maping is the key component in making top noch search queries
- Dynamic Mapping (strict, false, runtime, true)
- Explicit Mapping 
- Type coercions
- Field Types: Text, numbers, dates, array(!), nested(!)
- Field Properties: nested, coerce, doc_values, norms, index, null_value, copy_to

---

# Workshop Mappings - What is an analyzer? 

- defines the method of parsing, tokenizing and transformaiton done on input. 
- Elastic has a default analyzer which is defined as following
- we define an analyzer to an index and then attach to a field
- may need to apply data scientist :) 

```js
{
  "settings": {
    "analysis": {
      "analyzer": {
        "rebuilt_standard": {
          "tokenizer": "standard",
          "filter": [
            "lowercase"       
          ]
        }
      }
    }
  }
}
```

<!-- 
-->
---

# Demo - Mappings

<div> 
<img src="/demo.png" class="center"/>
</div>

<style>
.center {
  margin: auto;
  width: 60%;
  padding: 10px;
}
</style>

---

# Self - Mapping

<div> 
<img src="/self.webp" class="center"/>
</div>

<style>
.center {
  margin: auto;
  width: 60%;
  padding: 10px;
}
</style>

---

# Workshop Mappings - Tips
<br>

   - use strict mappings
   - not to map text fields as text and keywords
   - disable coercion 
   - mapping the index is half the battle
   - nested - avoid using if possibile
   - version index names ```index_name@1_0_0```

---

# Bulk API - Demo

<div> 
<img src="/demo.png" class="center"/>
</div>

<style>
.center {
  margin: auto;
  width: 60%;
  padding: 10px;
}
</style>

---

# Self - Index with bulk API

<div> 
<img src="/self.webp" class="center"/>
</div>

<style>
.center {
  margin: auto;
  width: 60%;
  padding: 10px;
}
</style>

---

# Searching 
 - Routing  
 - Context: Query vs Filter - Boolean evaluation and Relevance Evaluation 
 - Term vs Match  Term = Value ---> Inverted Index, Match: Value-->Analayzer --> Inverted Index
 - Term: Range, ID, Exist, Prefix, Wildcard, 
 - Full Text: match, match_phrase, multi_match
 - Relevance score (_score)
    - TF/IF (aproximity score, field length norm) Data Scientest may be summoned  
    - https://www.elastic.co/blog/practical-bm25-part-2-the-bm25-algorithm-and-its-variables
 - Explain API 
 - compound queries 
 - Boolean Search: must, must_not, filter, should
 - Other Compound quries: function score, dis_max query and boosting queries 

---

# Searching - Demo

<div> 
<img src="/demo.png" class="center"/>
</div>

<style>
.center {
  margin: auto;
  width: 60%;
  padding: 10px;
}
</style>

---

# Searching - Hacker News Search

<div> 
<img src="/self.webp" class="center"/>
</div>

<style>
.center {
  margin: auto;
  width: 60%;
  padding: 10px;
}
</style>

---

# Where to go from here 
 
 - Refining serach - synonyms, proximity, steming, edit distance 
 - Aggregations - counting things, analytics
 - Auto Complete - NGrams, Suggestors, fuzzy search
 - multi search api - bulk api for search
 - documents relations - JOIN (Be ware of the perfomance)
 - elastic ops, cluster managment - shrink/split api
 - other parts of the elastic stack 
 - Hot/Warm/Cold architecture
 - TribeNode 
 - ML









