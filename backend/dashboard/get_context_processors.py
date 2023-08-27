import json


def get_context(request, context: dict = {}, segment=None,):
    if segment:
        context.update({
            'segment': segment
        })
    table_segments = []
    important_table_segments = []
    with open('dashboard/json/segments.json', 'r') as f:
        table_segments = json.loads(f.read())
    with open('dashboard/json/important-segments.json', 'r') as f:
        important_table_segments = json.loads(f.read())
    context.update({
        'table_segments': [],
        'important_table_segments': [],
    })
    for i in range(len(table_segments)):
        if request.user.group_name in table_segments[i]["groups"]:
            context['table_segments'].append({
                "label": table_segments[i]['label'],
                "active": table_segments[i]['link'] == segment,
                "link": table_segments[i]['link'],
            })
    for i in range(len(important_table_segments)):
        if request.user.group_name in important_table_segments[i]["groups"]:
            context['important_table_segments'].append({
                "label": important_table_segments[i]['label'],
                "active": important_table_segments[i]['link'] == segment,
                "link": important_table_segments[i]['link'],
            })
    return context
