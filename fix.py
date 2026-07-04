import re

file_path = r'd:\RawData\inteution_website_new\website\erp.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace onclick
content = content.replace('onclick="selectModule(\'${m.code}\', this)"', 'data-action="selectModule" data-code="${m.code}"')
content = content.replace('onchange="updateCmnr()"', 'data-action="updateCmnr"')
content = content.replace('oninput="updateSettleWindow(this.value)"', 'data-action="updateSettleWindow"')
content = content.replace('onclick="setAgyCalculationMode(\'element\')"', 'data-action="setAgyCalculationMode" data-mode="element"')
content = content.replace('onclick="setAgyCalculationMode(\'container\')"', 'data-action="setAgyCalculationMode" data-mode="container"')
content = content.replace('onclick="executeAgencySettle()"', 'data-action="executeAgencySettle"')
content = content.replace('onchange="updateEmsSandbox(this.value)"', 'data-action="updateEmsSandbox"')
content = content.replace('onchange="updateSlotSandbox()"', 'data-action="updateSlotSandbox"')
content = content.replace('oninput="adjustSlotSlider(this.value)"', 'data-action="adjustSlotSlider"')
content = content.replace('onclick="toggleEximReport(\'summary\')"', 'data-action="toggleEximReport" data-type="summary"')
content = content.replace('onclick="toggleEximReport(\'daily\')"', 'data-action="toggleEximReport" data-type="daily"')
content = content.replace('onclick="triggerExport(\'JSON\')"', 'data-action="triggerExport" data-type="JSON"')
content = content.replace('onclick="triggerExport(\'EDI\')"', 'data-action="triggerExport" data-type="EDI"')
content = content.replace('onclick="triggerExport(\'PDF\')"', 'data-action="triggerExport" data-type="PDF"')
content = content.replace('onclick="triggerExport(\'Excel\')"', 'data-action="triggerExport" data-type="Excel"')
content = content.replace('onclick="selectTimelineNode(${idx})"', 'data-action="selectTimelineNode" data-idx="${idx}"')
content = content.replace('onclick="setExportStep(${idx})"', 'data-action="setExportStep" data-idx="${idx}"')
content = content.replace('onclick="setExportStep(${Math.max(0, idx - 1)})"', 'data-action="setExportStep" data-idx="${Math.max(0, idx - 1)}"')
content = content.replace('onclick="setExportStep(${Math.min(15, idx + 1)})"', 'data-action="setExportStep" data-idx="${Math.min(15, idx + 1)}"')

# Now append the event delegation logic just before closing body tag
delegation_script = '''
  <script>
    document.addEventListener('change', function(e) {
      if (!e.target || !e.target.getAttribute) return;
      var action = e.target.getAttribute('data-action');
      if (action === 'updateCmnr') updateCmnr();
      else if (action === 'updateEmsSandbox') updateEmsSandbox(e.target.value);
      else if (action === 'updateSlotSandbox') updateSlotSandbox();
    });

    document.addEventListener('input', function(e) {
      if (!e.target || !e.target.getAttribute) return;
      var action = e.target.getAttribute('data-action');
      if (action === 'updateSettleWindow') updateSettleWindow(e.target.value);
      else if (action === 'adjustSlotSlider') adjustSlotSlider(e.target.value);
    });

    document.addEventListener('click', function(e) {
      var el = e.target.closest('[data-action]');
      if (!el) return;
      var action = el.getAttribute('data-action');
      
      if (action === 'selectModule') selectModule(el.getAttribute('data-code'), el);
      else if (action === 'setAgyCalculationMode') setAgyCalculationMode(el.getAttribute('data-mode'));
      else if (action === 'executeAgencySettle') executeAgencySettle();
      else if (action === 'toggleEximReport') toggleEximReport(el.getAttribute('data-type'));
      else if (action === 'triggerExport') triggerExport(el.getAttribute('data-type'));
      else if (action === 'selectTimelineNode') selectTimelineNode(parseInt(el.getAttribute('data-idx')));
      else if (action === 'setExportStep') setExportStep(parseInt(el.getAttribute('data-idx')));
    });
  </script>
'''

if 'data-action="selectModule"' in content and 'document.addEventListener(\'change\'' not in content:
    content = content.replace('</body>', delegation_script + '\n</body>')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Success')
