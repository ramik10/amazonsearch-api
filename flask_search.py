from flask import Flask, request


# In[4]:


from autoscraper import AutoScraper


# In[5]:


amazon_scraper=AutoScraper()


# In[6]:


amazon_scraper.load('amazon-search')


# In[7]:


app=Flask(__name__)


# In[8]:


def get_amazon_result(search_query):
    url = 'https://www.amazon.in/s?k=%s' % search_query
    result = amazon_scraper.get_result_similar(url, group_by_alias=True)
    return _aggregate_result(result)


# In[9]:


def _aggregate_result(result):
    final_result = []
    print(list(result.values())[0])
    for i in range(len(list(result.values())[0])):
        try:
            
            final_result.append({alias: result[alias][i] for alias in result})
        except:
            pass
    return final_result


# In[ ]:


@app.route('/', methods=['GET'])
def search_api():
    query = request.args.get('q')
    print(query)
    return dict(result=get_amazon_result(query))

if __name__ == '__main__':
    app.run(port=8080, host='0.0.0.0')





