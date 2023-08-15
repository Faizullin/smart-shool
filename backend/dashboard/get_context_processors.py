import json

def get_context(context: dict = {}, segment = None):
    if segment:
        context.update({
            'segment': segment
        })
    table_segments = []
    with open('dashboard/json/segments.json', 'r') as f:
        table_segments = json.loads(f.read())
    context.update({
        'tables': table_segments
    })
    for i in range(len(context['tables'])):
        if context['tables'][i]['link'] == segment:
            context['tables'][i]['active'] = True
    return context